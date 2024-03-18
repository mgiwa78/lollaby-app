type User = {
  __v: number;
  _id: string;
  createdAt: string;
  dob: string;
  email: string;
  firstname: string;
  gender: string;
  preference: string;
  id: string;
  lastname: string;
  nin: string;
  occupation: string;
  phone: {
    home: string;
    mobile: string;
  };
  role: "security" | "users";
  updatedAt: string;
};

export default User;
