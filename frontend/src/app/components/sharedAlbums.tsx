import Select from 'react-select';

export default function AlbumInfo (props: any){
    //Available albums for selection in dropdown menu
    const option = props.sharedAlbums.map((item: any) => {
        return {value: item, label: item.info.album_name}
    })

    //Initialize album selection update
    const albumSelect = async (e: any) => {
        if(e == null){
            props.setAlbums({});
            props.setPerm([]);
        } else {
            props.setAlbums(e.value);
        }
    }

    return (
        <div className="flex flex-col items-center">
            <Select 
                    className="basic-single mt-2"
                    classNamePrefix="select"
                    isClearable={true}
                    isSearchable={true}
                    name="SearchSelect"
                    options={option} 
                    // onChange={(e) => {albumSelect(e)}}
                />
        </div>
    );
}