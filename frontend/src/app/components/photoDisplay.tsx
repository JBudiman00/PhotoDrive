interface PhotoInterface {
    albums: {
        album_id: number,
        album_name: string,
        date: string,
        user_id: number
    },
    photoList: Array<any>,
    //Toggle equals true for all photos and false for album only
    toggle: boolean
}

export default function PhotoDisplay (props: PhotoInterface) {
    const album_id = props.albums.album_id;
    const list = props.photoList.map((item: any) => {
        //Adding blue highlight and showing images beloing to selected album
        if((!(item.photoalbums === undefined) && item.photoalbums.some((e: any) => e.album_id === album_id))){
            return (
                <div className="flex flex-col items-center grid-span-1 h-48" key={item.img_id}>
                    <img className="border-2 border-blue-500" src={item.img}/>
                    <p>{item.img_name}</p>
                </div>
            );
        }
        //If toggle for photo selection is true, return image not belonging to selected album
        //without a blue highlight
        if(props.toggle == true){
            return (
                <div className="flex flex-col items-center grid-span-1 h-48" key={item.img_id}>
                    <img src={item.img}/>
                    <p>{item.img_name}</p>
                </div>
            );
        }
    })

    return (
        <>
        {list}
        </>
    )
}