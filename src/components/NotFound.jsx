import searchIcon from "../assets/searchicon.png"
const NotFound = () =>{
    return(
        <div className="flex flex-col justify-center items-center h-screen">
            <img className="w-2/12 p-8" src={searchIcon} alt="" />
            <h1 className="text-center text-xl">Could not find what you were looking for... Try Again</h1>
        </div>
    )
}
export default NotFound