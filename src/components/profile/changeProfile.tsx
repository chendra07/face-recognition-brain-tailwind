// import React, { useState } from "react";
// import { FormInput } from "..";

// type ChangeProfileOutout = {
//   image64?:string;

// };

// export default function ChangeProfile() {
//   return (
//     <div className="flex flex-col items-center px-12">
//       <h1 className="text-4xl p-2 mt-2 mb-8 text-slate-500 dark:text-gray-200">
//         Edit Profile
//       </h1>
//       <FormInput.Text name="name" placeholder="Name" onChange={(_) => {}} />
//       <div className="flex w-full gap-8 my-8 flex-wrap">
//         <FormInput.Password
//           name="oldPassword"
//           placeholder="Old Password"
//           onChange={(_) => {}}
//         />
//         <FormInput.Password
//           name="newPassword"
//           placeholder="New Password"
//           onChange={(_) => {}}
//         />
//         <FormInput.Password
//           name="cPassword"
//           placeholder="Confirm Password"
//           onChange={(_) => {}}
//         />
//       </div>
//       <FormInput.FileInput
//         accept={[".png", ".jpg", ".jpeg", ".webp"]}
//         deleteElement={
//           <span
//             onClick={(_) => {}}
//             className="material-icons text-red-600 cursor-pointer active:opacity-80"
//           >
//             delete_forever
//           </span>
//         }
//         onChange={(_) => {}}
//         name="image64"
//       >
//         <>
//           <span className="material-icons">image</span>
//           <span>Upload Image</span>
//         </>
//       </FormInput.FileInput>
//     </div>
//   );
// }
