"use client"
import { ChangeEvent, useEffect, useState } from 'react'
import { getLocationCoordinates, getUserLocationFromCoordinates } from '../actions/geocoding'
import { GeoCoderLocation } from '../types'
import { from, fromEvent } from 'rxjs'
import { debounceTime,switchMap,distinctUntilChanged,map,filter ,tap,catchError} from 'rxjs/operators'
import { useRouter } from 'next/navigation'


const SearchBar = () => {
    const [relevantLocations, setRelevantLocations] = useState<GeoCoderLocation[]>([])
    const router=useRouter()
    useEffect(() => {
        if('geolocation' in navigator){
            navigator.geolocation.getCurrentPosition(async ({coords})=>{
                const {latitude,longitude}=coords
                const userLocation=await getUserLocationFromCoordinates({latitude,longitude})
                router.push(`/?location=${userLocation[0].name}&state=${userLocation[0].state}&lat=${latitude}&lon=${longitude}`)
            })
        }
        const searchInput = document.getElementById("search-input");
        if (!searchInput) {
            console.error("Element with ID 'search' not found.");
            return;
        }
        const subscription=fromEvent(searchInput, 'input').pipe(
            map(event=>(event.target as HTMLInputElement).value),
            filter(searchTerm => searchTerm.length > 2),
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(searchKey =>from(getLocationCoordinates(searchKey as string)).pipe(
                catchError((err) => {
                    return [];
                  })
                
            ) ))
            .subscribe(setRelevantLocations);
        
        return ()=>subscription.unsubscribe()



    }, [])
    return (
        <div className="navbar-center">
            <div className="dropdown">
                <input className="input" placeholder="enter location"  id='search-input' />
                <div className="dropdown-menu">
                    {relevantLocations.map(location => <a key={`${location.lat}${location.lon}`} href={`?location=${location.name}&state=${location.state}&lat=${location.lat}&lon=${location.lon}`} className="dropdown-item text-sm">{`${location.name} ${location.country} ${location.state}`}</a>)}
                </div>
            </div>
            <button className="btn btn-primary">search</button>
        </div>
    )
}

export default SearchBar