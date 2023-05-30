import axios from 'axios';

interface PhotoInterface {
    albums: {
        album_id: number,
        album_name: string,
        date: string,
        user_id: number
    },
    photoList: Array<any>,
    //Toggle equals true for all photos and false for album only
    toggle: boolean,
    setBorderStatus: any
}

export default function PhotoDisplay (props: PhotoInterface) {
    const album_id = props.albums.album_id;

    //Type is a boolean, where true represents clicks from photos in albums and 
    //false represents clicks from photos outside album 
    const handleClick = async (e: any, img: any, type: boolean) => {
        e.preventDefault();
        //Handle case where no album ID is selected
        if(album_id === undefined){
            return;
        }
        if(type == true){
            await axios.delete('http://localhost:8000/photos/' + img.img_id + '/album/' + album_id, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                props.setBorderStatus(true);
            })
        } else {
            await axios.post('http://localhost:8000/photos/' + img.img_id + '/album/' + album_id, { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                props.setBorderStatus(true);
            })
        }
    }

    const list = props.photoList.map((item: any) => {
        //Adding blue highlight and showing images belonging to selected album
        if((!(item.photoalbums === undefined) && item.photoalbums.some((e: any) => e.album_id === album_id))){
            return (
                <div className="flex flex-col items-center grid-span-1 h-48" key={item.img_id}>
                    <img className="border-2 border-blue-500" src={item.img} onClick={(e:any) => handleClick(e, item, true)}/>
                    <p>{item.img_name}</p>
                </div>
            );
        }
        //If toggle for photo selection is true, return image not belonging to selected album
        //without a blue highlight
        if(props.toggle == true){
            return (
                <div className="flex flex-col items-center grid-span-1 h-48" key={item.img_id}>
                    <img src={item.img} onClick={(e:any) => handleClick(e, item, false)}/>
                    <p>{item.img_name}</p>
                </div>
            );
        }
    });

    return (
        <>
        {list}
        </>
    )
}