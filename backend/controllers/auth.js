const bcrypt = require("bcryptjs");
const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
var nodeMailer = require("nodemailer");
var { google } = require("googleapis");
const crypto = require("crypto");

// const CLIENT_ID =
//   "335674338168-shke2ermkcgu3rdkroomplhh58sa11e7.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// REFRESH_TOKEN =
//   "1//049JTQug4rI_DCgYIARAAGAQSNwF-L9Ir_K9Os1ucVNizApYQqanZvHXNQXJKxZyO1NkjAWWh9ILsLZZceCVavNjKo7m79bWYzqE";

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const accessToken = oAuth2Client.getAccessToken();

const userSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields!" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password should be at least 8 characters long" });
    }
    if (confirmPassword !== password) {
      return res.status(400).json({ message: "Passwords should match" });
    }

    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPwd = await bcrypt.hash(password, 12);

    const newUser = new userSchema({
      name,
      email,
      password: hashedPwd,
    });

    const result = await newUser.save();
    console.log(result)

    // const transport = nodeMailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     type: "OAuth2",
    //     user: "kuldeepchahar426@gmail.com",
    //     clientId: CLIENT_ID,
    //     clientSecret: CLIENT_SECRET,
    //     refreshToken: REFRESH_TOKEN,
    //     accessToken: accessToken,
    //   },
    // });

    // const mailOptions = {
    //   from: "kuldeepchahar426@gmail.com",
    //   to: email,
    //   subject: "Welcome",
    //   html: "<h1>Welcome you have successfully signed up ! </h1>",
    // };

    // const mailResult = await transport.sendMail(mailOptions);
    // console.log("Mail sent successfully:", mailResult);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await userSchema.findOne({ email });
    if (!findUser) {
      return res.status(500).json({ message: "Please sign up !!" });
    }

    const isMatchPassword = await bcrypt.compare(password, findUser.password);
    if (!isMatchPassword) {
      return res.status(500).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ email }, "kuldeep_secret_key", {
      expiresIn: "1h",
    });
    res.cookie("token", token, { httpOnly: true, secure: "production" });

    res.status(200).json({success: true, message: "User logged In", email, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No user with this email" });
    }
    const buffer = await new Promise((resolve, reject) => {
      crypto.randomBytes(32, (err, buf) => {
        if (err) reject(err);
        else resolve(buf);
      });
    });

    const token = buffer.toString("hex");

    user.resetToken = token;
    user.resetTokenExpiration = Date.now() + 3600000;
    const result = await user.save();

    const transport = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "kuldeepchahar426@gmail.com",
        clientId: CLIENT_ID, 
        clientSecret: CLIENT_SECRET, 
        refreshToken: REFRESH_TOKEN, 
        accessToken: accessToken, 
      },
    });

    const mailOptions = {
      from: "kuldeepchahar426@gmail.com",
      to: email,
      subject: "Password reset",
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
      `,
    };

    const mailResult = await transport.sendMail(mailOptions);
    console.log("Mail sent successfully:", mailResult);

    res.status(201).json({
      success: true,
      message: "Reset initiated!!!",
      user: result,
    });
  } catch (err) {
    console.error("Error occurred while resetting password:", err);
    res.status(500).json({ success: false, message: "Error resetting password" });
  }
};


const newPassword = async (req, res, next) => {
  try {
    const newPassword = req.body.password;
    const userId = req.body._id;
    const passwordToken = req.params.token;

    const resetUser = await userSchema.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
    });

    if (!resetUser) {
      return res.status(400).json({ success: false, message: 'Invalid token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    resetUser.password = hashedPassword;
    resetUser.resetToken = undefined;
    resetUser.resetTokenExpiration = undefined;

    await resetUser.save();

    res.status(201).json({
      success: true,
      message: "Password updated successfully!"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'An error occurred.' });
  }
};

const userLogout = async() => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.json({ success: true, message: "Logout successful" });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
 
exports.userSignup = userSignup;
exports.userLogin = userLogin;
exports.resetPassword = resetPassword
exports.newPassword = newPassword
exports.userLogout = userLogout
