export default function Header(){
    return <div className=' flex justify-between p-2 shadow-lg md:text-3xl text-xl'>
    <div className='p-2'>
        
    <a href="/courses"  className=' text-white font-bold italic p-3'>Coursify</a>
    </div>
    <div>
        <a href="./adminRegister" className=' p-2 text-white m-3 italic' >Admin</a>
    <a  href='./Login' className=' p-2 text-white m-3 italic' >Login</a>

    <a href="./courses" className=' p-2 text-white m-3 italic'>Courses</a>

    <a  href="./about"className=' p-2 text-white italic'>About</a>
    </div>
    </div>
}