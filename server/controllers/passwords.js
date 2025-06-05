import Password from '../models/Password.js';

export const addPassword = async (req, res) => {
  try {
    const { websiteName, websiteLink, username, password } = req.body;
    const newPass = new Password({
      user: req.user.id, // ✅ fixed here
      websiteName,
      websiteLink,
      username,
      password,
    });
    await newPass.save();
    res.status(201).json(newPass);
  } catch (error) {
    res.status(500).json({ message: 'Error adding password', error: error.message });
  }
};

export const getPasswords = async (req, res) => {
  try {
    const passwords = await Password.find({ user: req.user.id }); // ✅ fixed here
    res.json(passwords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching passwords', error: error.message });
  }
};

export const deletePassword = async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting password', error: error.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const updated = await Password.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ updatedPassword: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password', error: error.message });
  }
};
