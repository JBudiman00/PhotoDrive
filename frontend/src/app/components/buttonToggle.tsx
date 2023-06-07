export default function buttonToggle(props: any) {
    if(props.toggle == true){
        return (
            <div className="flex flex-row">
                <div className="bg-[#212A3E] rounded-2xl p-2 mx-2">
                    <p className="text-[#F1F6F9]">{props.text1}</p>
                </div>
                <div className="bg-[#F1F6F9] rounded-2xl p-2 mx-2">
                    <p className="text-black">{props.text2}</p>
                </div>
            </div>
        );
    } else {
        return (
            <div className="flex flex-row">
                <div className="bg-[#F1F6F9] rounded-2xl p-2 mx-2">
                    <p className="text-black">{props.text1}</p>
                </div>
                <div className="bg-[#212A3E] rounded-2xl p-2 mx-2">
                    <p className="text-[#F1F6F9]">{props.text2}</p>
                </div>
            </div>
        )
    }
}