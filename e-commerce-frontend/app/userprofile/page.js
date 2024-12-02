"use client";
import { useState } from "react";
// import "./index.css";

function page() {
	let user = {
		firstname: "Scarlett",
		lastname: "Johansson",
		dob: "1984-11-22",
		gender: "Female",
		email: "scarlett@email.com",
		contact: "+123456789",
		address: "Hollywood, CA",
	};

	const [edit, setEdit] = useState(false);

	return (
		<div className="App">
			<div className="grid gap-x-10 grid-cols-[1fr,5fr] grid-rows-[100px,auto]">
				<div className="h-screen bg-gray-300 row-span-2 p-2">
					<div className="w-60 h-60 mx-auto my-20 bg-white rounded-full overflow-hidden flex items-center justify-center">
						<img
							src="https://www.wallofcelebrities.com/celebrity/scarlett-johansson/pictures/xxlarge/scarlett-johansson_1467.jpg"
							alt={user.firstname + " " + user.lastname}
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

				<div className="h-auto bg-gray-300 p-20 rounded-md">
					<h1 className="text-3xl font-bold">My Profile</h1>

					<div className="flex justify-end">
						<span
							className=" text-blue-500 underline cursor-pointer"
							onClick={() => {
								setEdit(!edit);
							}}
						>
							Edit
						</span>
					</div>

					{!edit ? (
						<div className="grid grid-cols-2 grid-rows-5  gap-y-10 gap-x-4">
							<div>
								<label htmlFor="firstname" className="block">
									First Name
								</label>
								<input
									type="text"
									defaultValue={user.firstname}
									className="w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>

							<div>
								<label htmlFor="lastname" className="block">
									Last Name
								</label>
								<input
									type="text"
									defaultValue={user.lastname}
									className="w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>

							<div>
								<label htmlFor="dob" className="block">
									DOB
								</label>
								<input
									type="date"
									defaultValue={user.dob}
									className=" w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>

							<div>
								<label htmlFor="Gender" className="block">
									Gender
								</label>

								<input
									type=""
									defaultValue={user.gender}
									className="w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>
							<div className="col-span-2 ">
								<label htmlFor="Email" className="block">
									Email
								</label>
								<input
									type="email"
									defaultValue={user.email}
									className="w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>

							<div className="col-span-2">
								<label htmlFor="contact" className="block">
									Contact
								</label>
								<input
									type="text"
									defaultValue={user.contact}
									className="w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>

							<div className="col-span-2">
								<label htmlFor="address" className="block">
									Address
								</label>
								<input
									type="text"
									defaultValue={user.address}
									className="w-full h-10 ps-4 font-thin text-3xl bg-transparent"
									disabled
								></input>
							</div>
						</div>
					) : (
						<div className="grid grid-cols-2 grid-rows-5  gap-y-10 gap-x-4 rounded-md">
							<div>
								<label htmlFor="firstname" className="block">
									First Name
								</label>
								<input
									type="text"
									defaultValue={user.firstname}
									className="w-full h-10 ps-4 font-thin text-3xl rounded-md"
								></input>
							</div>

							<div>
								<label htmlFor="lastname" className="block">
									Last Name
								</label>
								<input
									type="text"
									defaultValue={user.lastname}
									className="w-full h-10 ps-4 font-thin text-3xl rounded-md"
								></input>
							</div>

							<div>
								<label htmlFor="dob" className="block">
									DOB
								</label>
								<input
									type="date"
									defaultValue={user.dob}
									className=" w-full h-10 ps-4 font-thin text-3xl rounded-md"
								></input>
							</div>

							<div>
								<label htmlFor="Gender" className="block">
									Gender
								</label>

								<select
									className="w-full h-10 ps-4 bg-white font-thin text-3xl rounded-md"
									id="gender"
								>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								</select>
							</div>
							<div className="col-span-2 ">
								<label htmlFor="Email" className="block">
									Email
								</label>
								<input
									type="email"
									defaultValue={user.email}
									className="w-full h-10 ps-4 font-thin text-3xl rounded-md"
								></input>
							</div>

							<div className="col-span-2">
								<label htmlFor="contact" className="block">
									Contact
								</label>
								<input
									type="text"
									defaultValue={user.contact}
									className="w-full h-10 ps-4 font-thin text-3xl rounded-md"
								></input>
							</div>

							<div className="col-span-2">
								<label htmlFor="address" className="block">
									Address
								</label>
								<input
									type="text"
									defaultValue={user.address}
									className="w-full h-10 ps-4 font-thin text-3xl rounded-md"
								></input>
							</div>
						</div>
					)}

					{edit ? (
						<div className="mt-8 flex justify-evenly">
							<button className="bg-cyan-400 px-10 py-2 rounded-md h-10">
								Save
							</button>
							<button
								type="reset"
								className="bg-red-500 px-10 py-2 rounded-md h-10"
							>
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
