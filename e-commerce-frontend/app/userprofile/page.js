'use client'
import { useState } from "react";
// import "./index.css";

function page() {
	let user = {
		firstname: "John",
		secondname: "Carter",
		dob: "1999-01-01",
		gender: "Male",
		email: "email@email.com",
		contact: "123456789",
		address: "123 street",
	};

	const [edit, setEdit] = useState(false);

	return (
		<div className="App">
			<div className="grid gap-x-10 grid-cols-[1fr,5fr] grid-rows-[100px,auto]">
				<div className="h-screen bg-gray-300 row-span-2 p-2">
					<div className="w-60 h-60 mx-auto my-20 bg-white rounded-full overflow-hidden flex items-center justify-center">
						<img
							src="https://www.wallofcelebrities.com/celebrity/scarlett-johansson/pictures/xxlarge/scarlett-johansson_1467.jpg"
							alt="profile-pic"
						/>
					</div>
					<div className="text-center">
						<ul>
							<li className="p-5 border-t">My Profile</li>
							<li className="p-5 border-t text-red-600">Logout</li>
						</ul>
					</div>
				</div>

				<div className="text-center mt-10">
					<h1>E-commerce</h1>
				</div>

				<div className="w-11/12 h-auto bg-gray-300 p-20 ">
					<h1 className="text-3xl font-bold">My Profile</h1>

					<p
						className="text-right text-blue-500 underline cursor-pointer"
						onClick={()=>{setEdit(!edit)}}
					>
						Edit
					</p>

					<div className="grid grid-cols-2 grid-rows-5 gap-y-10 gap-x-4">
						<div>
							<label htmlFor="firstname" className="block">
								First Name
							</label>
							<input
								type="text"
								defaultValue={user.firstname}
								className="w-full h-10 ps-4"
								readOnly={!edit}
							></input>
						</div>

						<div>
							<label htmlFor="secondname" className="block">
								Second Name
							</label>
							<input
								type="text"
								defaultValue={user.secondname}
								className="w-full h-10 ps-4"
								readOnly={!edit}
							></input>
						</div>

						<div>
							<label htmlFor="dob" className="block">
								DOB
							</label>
							<input
								type="date"
								defaultValue={user.dob}
								className=" w-full h-10 ps-4"
								readOnly={!edit}
							></input>
						</div>

						<div>
							<label htmlFor="Gender" className="block">
								Gender
							</label>
							{!edit ? (
								<input
									type=""
									defaultValue={user.gender}
									className="w-full h-10 ps-4"
									readOnly={!edit}
								></input>
							) : (
								<select className="w-full h-10 ps-4 bg-white">
									<option>Male</option>
									<option>Female</option>
									<option>Other</option>
								</select>
							)}
						</div>
						<div className="col-span-2">
							<label htmlFor="Email" className="block">
								Email
							</label>
							<input
								type="email"
								defaultValue={user.email}
								className="w-full h-10 ps-4"
								readOnly={!edit}
							></input>
						</div>

						<div className="col-span-2">
							<label htmlFor="contact" className="block">
								Contact
							</label>
							<input
								type="text"
								defaultValue={user.contact}
								className="w-full h-10 ps-4"
								readOnly={!edit}
							></input>
						</div>

						<div className="col-span-2">
							<label htmlFor="address" className="block">
								Address
							</label>
							<input
								type="text"
								defaultValue={user.address}
								className="w-full h-10 ps-4"
								readOnly={!edit}
							></input>
						</div>
					</div>

					{edit ? (
						<div className=" text-center mt-8">
							<button className="bg-cyan-400 px-10 py-2">Save</button>{" "}
							<button type="reset" className="bg-red-500 px-10 py-2">
								Reset
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default page;
