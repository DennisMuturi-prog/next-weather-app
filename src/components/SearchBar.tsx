"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import { getLocationCoordinates, getUserLocationFromCoordinates } from '../actions/geocoding'
import { Coordinates, GeoCoderLocation, UserLocation } from '../types'
import { from, fromEvent } from 'rxjs'
import { debounceTime, switchMap, distinctUntilChanged, map, filter, tap, catchError } from 'rxjs/operators'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'


const SearchBar = () => {
    const [searchLocation, setSearchLocation] = useState("")
    const [relevantLocations, setRelevantLocations] = useState<GeoCoderLocation[]>([])
    const [userCoordinates,setUserCoordinates]=useState<Coordinates>()
    const [userLocation,setUserLocation]=useState<UserLocation>()

    const searchParams = useSearchParams()

    const router = useRouter()
    const pathName = usePathname()
    useEffect(() => {
        if ('geolocation' in navigator) {
            console.log("I was run")
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                setUserCoordinates(coords)
                const { latitude, longitude } = coords
                const userLocation = await getUserLocationFromCoordinates({ latitude, longitude })
                setUserLocation(userLocation[0])
                router.push(`/?location=${userLocation[0].name}&state=${userLocation[0].state}&lat=${latitude}&lon=${longitude}&units=${searchParams.get("units") || "metric"}`)
            })
        }


        const searchInput = document.getElementById("search-input");
        if (!searchInput) {
            console.error("Element with ID 'search' not found.");
            return;
        }
        const subscription = fromEvent(searchInput, 'input').pipe(
            map(event => (event.target as HTMLInputElement).value),
            filter(searchTerm => searchTerm.length > 2),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(searchKey => from(getLocationCoordinates(searchKey as string)).pipe(
                catchError((err) => {
                    toast.error("an error occurred while searching for locations")
                    return [];
                })

            )))
            .subscribe(setRelevantLocations);

        return () => subscription.unsubscribe()



    }, [])
    const handleUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
        toast.loading("changing units", {
            duration: 1000
        })
        const newUnit = event.target.value; // Get the selected unit
        const currentParams = new URLSearchParams(searchParams.toString()); // Clone current query parameters
        currentParams.set("units", newUnit); // Update the "units" parameter
        router.push(`${pathName}?${currentParams.toString()}`);
        // Push the updated query parameters
    };
    const onSearchClick = async () => {
        console.log(searchLocation)
        toast.loading("fetching coordinates")
        const relevantLocales = await getLocationCoordinates(searchLocation)
        const location = relevantLocales[0]
        router.push(`/search?location=${location.name}&state=${location.state}&lat=${location.lat}&lon=${location.lon}&units=${searchParams.get("units") || "metric"}`)
        toast.dismiss()
    }
    return (
        <>
            <div className="navbar-start">
                <Link href={`/?units=${searchParams.get("units") || "metric"}&lat=${userCoordinates?.latitude}&lon=${userCoordinates?.longitude}&location=${userLocation?.name}&state=${userLocation?.state}`}>Home</Link>
            </div>
            <div className="navbar-center">
                <div className="dropdown">
                    <input className="input" placeholder="enter location" id='search-input' onChange={e => setSearchLocation(e.target.value)} />
                    <div className="dropdown-menu">
                        {relevantLocations.map(location => <Link key={`${location.lat}${location.lon}`} href={`/?location=${location.name}&state=${location.state}&lat=${location.lat}&lon=${location.lon}&units=${searchParams.get("units") || "metric"}`} className="dropdown-item text-sm">{`${location.name} ${location.country} ${location.state}`}</Link>)}
                    </div>
                </div>
                <button className="btn btn-primary" onClick={onSearchClick}>search</button>
            </div>
            <div className="navbar-end">
                <div className="tabs tabs-boxed">
                    <input type="radio" name="units" id="unit1" className="tab-toggle" value="metric" defaultChecked={searchParams.get("units") == "metric"}
                        onChange={handleUnitsChange} />
                    <label htmlFor="unit1" className="tab navbar-item">Celcius</label>
                    <input type="radio" name="units" id="unit2" className="tab-toggle" value="imperial"
                        defaultChecked={searchParams.get("units") == "imperial"}
                        onChange={handleUnitsChange} />
                    <label htmlFor="unit2" className="tab">Fahrenheit</label>
                    <input type="radio" name="units" id="unit3" className="tab-toggle" value="standard"
                        defaultChecked={searchParams.get("units") == "standard"}
                        onChange={handleUnitsChange} />
                    <label htmlFor="unit3" className="tab">Kelvin</label>
                </div>
            </div>
        </>
    )
}

export default SearchBar