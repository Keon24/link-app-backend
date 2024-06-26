import Profile from '../models/profile';


const updateProfile = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  try {
 
    let profile = await Profile.findOne({ email });

    if (profile) {

      profile.firstName = firstName;
      profile.lastName = lastName;
      await profile.save();
    } else {

      profile = new Profile({
        firstName,
        lastName,
        email,
      });
      await profile.save();
    }

    res.status(200).json({ message: 'Profile updated successfully', profile });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { updateProfile };
