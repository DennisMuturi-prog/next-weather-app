"use client"
import { ChangeEvent, useEffect, useState, useTransition } from 'react'
import { getLocationCoordinates, getUserLocationFromCoordinates } from '../actions/geocoding'
import { Coordinates, GeoCoderLocation, UserLocation } from '../types'
import { from, fromEvent } from 'rxjs'
import { debounceTime, switchMap, distinctUntilChanged, map, filter, catchError } from 'rxjs/operators'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'


const SearchBar = () => {
    const [isPending, startTransition] = useTransition()
    const [searchLocation, setSearchLocation] = useState("")
    const [relevantLocations, setRelevantLocations] = useState<GeoCoderLocation[]>([])
    const [userCoordinates, setUserCoordinates] = useState<Coordinates>()
    const [userLocation, setUserLocation] = useState<UserLocation>()
    const [dropdownOpen, setDropDownOpen] = useState(false)

    const searchParams = useSearchParams()

    const router = useRouter()
    const pathName = usePathname()
    useEffect(() => {
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
                    console.log(err)
                    toast.error("an error occurred while searching for locations", {
                        duration: 2000
                    })
                    return [];
                })

            )))
            .subscribe((relevantLocales) => {
                startTransition(() => {
                    setRelevantLocations(relevantLocales)
                })
            });

        return () => subscription.unsubscribe()



    }, [])
    const askForLocationPermission = () => {
        navigator.permissions.query({ name: "geolocation" }).then(async (result) => {
            if (result.state === "granted") {
                // Permission granted
                await fetchUserGeoLocation()
            } else if (result.state === "prompt") {
                // Permission not yet granted or denied
                toast(
                    (t) => (
                        <span>We need your permission for location so as to know the weather near you
                            <div>
                                <button className='btn btn-primary' onClick={async () => {
                                    toast.dismiss(t.id)
                                    await fetchUserGeoLocation()
                                }
                                }>Accept</button>
                                <button className='btn btn-error' onClick={() => toast.dismiss(t.id)}>Deny</button>
                            </div>
                        </span>
                    ),
                    {
                        duration: 5000,
                    }
                );

            } else if (result.state === "denied") {
                toast.error("you denied access to location",{
                    duration:1000
                })
                // Permission denied
            }
        });




    }
    const fetchUserGeoLocation = async () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(async ({ coords }) => {
                setUserCoordinates(coords)
                const { latitude, longitude } = coords
                const userLocation = await getUserLocationFromCoordinates({ latitude, longitude })
                setUserLocation(userLocation[0])
                startTransition(() => {
                    router.push(`/?location=${userLocation[0].name}&state=${userLocation[0].state}&lat=${latitude}&lon=${longitude}&units=${searchParams.get("units") || "metric"}`)
                })
            })
        }

    }
    const handleUnitsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newUnit = event.target.value; // Get the selected unit
        const currentParams = new URLSearchParams(searchParams.toString()); // Clone current query parameters
        currentParams.set("units", newUnit); // Update the "units" parameter
        startTransition(() => {
            router.push(`${pathName}?${currentParams.toString()}`);
        })
        // Push the updated query parameters
    };
    const onSearchClick = async () => {
        const myFetchPromise = getLocationCoordinates(searchLocation)
        toast.promise(
            myFetchPromise,
            {
                loading: 'fetching coordinates',
                success: (data) => {
                    const firstLocale = data[0]
                    setDropDownOpen(false)
                    startTransition(() => {
                        router.push(`?lat=${firstLocale.lat}&lon=${firstLocale.lon}&location=${firstLocale.name}&state=${firstLocale.state}&units=${searchParams.get('units') || 'metric'}`)
                    })
                    return data.length > 0 ? "successfully fetched coordinates" : "no results found"
                },
                error: 'an error occurred while fetching coordinates'
            },
            {
                position: "bottom-center"
            }
        )
    }
    return (
        <>
            <div className="navbar-start">
                <button className="btn btn-outline-primary" onClick={() => askForLocationPermission()
                }>My Location</button>

            </div>
            <div className="navbar-center">
                <div className="dropdown">
                    <input className="input" placeholder="enter location" id='search-input' onChange={e => setSearchLocation(e.target.value)} onFocus={() => setDropDownOpen(true)} />
                    {dropdownOpen && <div className="dropdown-menu">
                        {relevantLocations.length > 0 ? relevantLocations.map(location => <button key={`${location.lat} ${location.lon}`} className="dropdown-item text-sm"
                            onClick={() => {
                                setDropDownOpen(false)
                                startTransition(() => {
                                    router.push(`/?location=${location.name}&state=${location.state ? location.state : "unkown"}&lat=${location.lat}&lon=${location.lon}&units=${searchParams.get("units") || "metric"}`)
                                })
                            }}>{`${location.name} ${location.country} ${location.state}`}</button>) : isPending ? (<a className='dropdown-item'>
                                <div className="spinner-simple spinner-sm"></div>
                            </a>) : (<a className='dropdown-item text-sm'>no results</a>)}
                    </div>}
                </div>
                {(isPending && !dropdownOpen) && <div className="spinner-simple"></div>}
                <button className="btn btn-primary" onClick={onSearchClick}>search</button>
            </div>
            <div className="navbar-end">
                <div className="tabs tabs-boxed">
                    <input type="radio" name="units" id="unit1" className="tab-toggle" value="metric" defaultChecked={searchParams.get("units") == "metric" || !searchParams.get("units")}
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