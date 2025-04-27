import bcrypt from "bcryptjs";

const username = process.env.ADMINUSERNAME;

export const login = async (req, res) => {
    try {
        const { username: inputUsername, password: inputPassword } = req.body;
    
        if (inputUsername === username && await bcrypt.compare(inputPassword, process.env.PASSHASH)) {
            req.session.isAdmin = true;
            res.redirect("/dashboard")
        } else {
          res.status(401).send("البيانات غير صحيحة")
        }
      } catch (error) {
        console.log(error)
        res.status(500).send(error);
      }
}