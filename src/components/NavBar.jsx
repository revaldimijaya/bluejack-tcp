import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex">
                    <div className="flex">
                        <div>
                            <img src="https://academic-slc.apps.binus.ac.id/assets/ribbon.png" alt="" />
                        </div>
                        <div>
                            <img src="https://academic-slc.apps.binus.ac.id/assets/logo.png" alt="" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-evenly items-end">
                    <div className="">
                        Hello Revaldi Mijaya
                    </div>
                    <div className="">
                        <select name="" id="">
                            <option value="" selected>Odd Semester 2021/2022</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="border border-gray-500 border-l-0 border-r-0">
                <Link to="/home" style={{ color: '#777777' }} className="font-bold">Home</Link>
            </div>
        </div>
    )
}

export default NavBar