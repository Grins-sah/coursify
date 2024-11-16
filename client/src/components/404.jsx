import Header from "./Header";
import image from "/src/photo.png"

function Nopage(){
    return <div className="bg-gray-800 h-screen w-screen">
        <Header/>
        <div className="flex justify-center">
            <div className="flex-col justify-center">
                <img src={image} className="w-96 h-96"/>
            </div>
        </div>

    </div>
}
export default Nopage;