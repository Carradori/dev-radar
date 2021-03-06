const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async update(req, res) {
    const { techs, bio, avatar_url } = req.body;
    const techArray = parseStringAsArray(techs);
    const dev = await Dev.findByIdAndUpdate(
      req.params.id,
      {
        techs: techArray,
        bio,
        avatar_url,
      },
      { new: true }
    );

    return res.json(dev);
  },

  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async destroy(req, res) {
    await Dev.findOneAndDelete(req.params.id);
    return res.send();
  },

  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { avatar_url, bio, name = login } = apiResponse.data;

      const techArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techArray,
        location,
      });

      //filtrar as conexoes que estao a 10km
      //e que o novo dev tenha pelo menos uma das techs filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }
    return res.json(dev);
  },
};
