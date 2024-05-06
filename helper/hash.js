import bcrypt from "bcrypt"
// const hashpassword = async (req, res, next) => {

// }

const hashpassword1 = async (password) => {
    const hashpassword = await bcrypt.hash(password, 10);
    return hashpassword
}

export default hashpassword1;