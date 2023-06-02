import ToggleButton from '../components/buttonToggle';
import { useState } from 'react';
import axios from 'axios';

export default function photoToggle (props: any) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<any>(null);
    
    //Handle clicking in and out of popup icon
    const handleClick = (e: any) => {
        e.preventDefault();
        setIsOpen(true);
    }

    //Handle submitting post request with new images
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (selectedFiles) {
            //Package data to send to API
            const formData = new FormData();
            formData.append('img', selectedFiles);
            formData.append('img_name', selectedFiles.name)
            
            //API
            axios({
                method: "post",
                url: 'http://localhost:8000/photos',
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log(response);
                //Reload element containing uploaded photos
                props.setStatus(true);
                setIsOpen(false);
            })
            .catch((response) => {
                console.log(response)
            });
        }
    }
    const handleFileChange = (e: any) => {
        // const filesArray: Array<any> = Array.from(e.target.files);
        // setSelectedFiles(filesArray);
        setSelectedFiles(e.target.files[0]);
      };

    return (
        <div className="grid grid-cols-2 mt-2">
            <div className="flex flex-row">
                {<ToggleButton text1={props.item1} text2={props.item2} toggle={props.toggle} setToggle={props.setToggle}/>}
            </div>
            <div className="flex flex-row justify-end">
                <button className="flex rounded-full text-4xl justify-center items-center bg-[#212A3E] text-[#F1F6F9] h-12 w-12 pb-1"
                    onClick={handleClick}>
                    +
                </button>
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="fixed inset-0 bg-gray-800 opacity-75"></div>
                    <div className="relative bg-white rounded-lg p-8">
                        <div className="absolute top-0 right-0 p-4">
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={(e:any) => setIsOpen(false)}
                            >
                                Close
                            </button>
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-center">Upload photos</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center">
                                <input type="file" accept="image/*" onChange={handleFileChange} />
                                <input type="submit" className="bg-[#212A3E] text-[#F1F6F9] rounded-full py-2 w-1/2"/>
                            </div>
                        </form>
          
                    </div>
                    </div>
                )}
                <input className="rounded-2xl"/>
            </div>
        </div>
    );
}