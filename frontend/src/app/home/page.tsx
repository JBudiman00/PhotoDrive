'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoToggle from '../components/photoToggle';
import PhotoDisplay from '../components/photoDisplay';
import AlbumInfo from '../components/albumInfo'
import { useRouter } from 'next/navigation';
import ToggleButton from '../components/buttonToggle';

export default function Home() {
    //Interfaces
    //User-selected album interface
    interface albumInterface{
        album_id: number,
        album_name: string,
        date: string,
        user_id: number
    }
    interface userPermissions{
        email: string,
        name: string,
        user_id: number
    }

    //Toggle button between viewing all photos and album-specific
    const [toggle, setToggle] = useState(true);
    //Toggle button between viewing personal albums and shared albums
    const [toggleAlbum, setToggleAlbum] = useState(true);
    //Array storing all photos for a user
    const [photoList, setPhotoList] = useState<any>([]);
    //Array storing all albums for a user
    const [albumList, setAlbumList] = useState<any>([]);
    //Stores user-selected albums for viewing
    const [albums, setAlbums] = useState<albumInterface>({} as albumInterface);
    //Array storing view-permissions for all albums
    const [userPerm, setUserPerm] = useState<any>({});
    //Stores number representing view-permission selection for user selected albums
    const [perm, setPerm] = useState<Array<userPermissions>>([]);
    const router = useRouter();

    //Database GET calls
    useEffect(() => {
        //Fetch all user albums
        axios.get("http://localhost:8000/albums", { withCredentials: true })
        .then((response: any) => {
            console.log(response);
            setAlbumList(response.data);
        }).catch(error => {
            console.log(error.response.data);
            if(error.response.data == "Unauthorized"){
                router.push('/login');
            }
        });

        //Fetch all user photos
        axios.get("http://localhost:8000/photos", { withCredentials: true })
        .then((response: any) => {
            console.log(response.data)
            setPhotoList(response.data)
        }).catch(error => {
            console.log(error.response.data);
        });

        //Fetch shared user information
        axios.get('http://localhost:8000/albums/all', { withCredentials: true })
        .then((response) => {
            console.log(response.data)
            setUserPerm(response.data)
        })
    }, []);

    return (
        <>
        <div className="flex flex-col h-[calc(100vh-74px)]">
            <div className="grid grid-cols-5 flex-grow">
                <div className="col-span-1 bg-[#D9D9D9]">
                    <ToggleButton text1="Personal albums" text2="Shared albums" toggle={toggleAlbum} setToggle={setToggleAlbum} />
                    <AlbumInfo albums={albums} albumList={albumList} setUserPerm={setUserPerm} 
                    userPerm={userPerm} setAlbums={setAlbums} perm={perm} setPerm={setPerm}/>
                </div>
                <div className="col-span-4">
                    <PhotoToggle item1="All photos" item2="Album only" toggle={toggle} setToggle={setToggle} />
                    <div className="h-4"></div>
                    <div className="grid grid-cols-5">
                        <PhotoDisplay albums={albums} photoList={photoList} toggle={toggle}/>
                    </div>
                </div>
            </div>    
        </div>
        </>
    )
}