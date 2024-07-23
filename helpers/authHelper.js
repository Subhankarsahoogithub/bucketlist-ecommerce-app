import bcrypt from 'bcryptjs'


export const hashPassword = async (password) => {
    try {
       //create salt:
      const saltRounds = 10;
      //encrypt the original password using salt:
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      //send the encrypted password:
      return hashedPassword;
    } catch (error) {
      console.log("internal server error in hashedPassword function of authHelper.js: ", error.message);
    }
  };

  export const comparePassword = async (password, hashedPassword) => {
    //decrypt the hashed password and compare with original password given:
    return bcrypt.compare(password, hashedPassword);
  };