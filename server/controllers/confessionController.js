const Confession = require('../models/Confession');

exports.getConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find({ isApproved: true })
      .sort({ createdAt: -1 });
    res.json(confessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createConfession = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Content required' });
    const newC = await Confession.create({ content });
    res.status(201).json(newC);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.reactToConfession = async (req, res) => {
  try {
    const { id } = req.params;
    const { type } = req.body; // like or dislike
    if (!['like','dislike'].includes(type)) {
      return res.status(400).json({ message: 'Invalid reaction type' });
    }

    const field = type === 'like'
      ? 'reactions.likes'
      : 'reactions.dislikes';

    const updated = await Confession.findByIdAndUpdate(
      id,
      { $inc: { [field]: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error('React error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: 'Reply required' });

    const updated = await Confession.findByIdAndUpdate(
      id,
      { $push: { replies: { content } } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.reportConfession = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Confession.findByIdAndUpdate(
      id,
      { $inc: { reports: 1 } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Not found' });

    if (updated.reports >= 5 && updated.isApproved) {
      updated.isApproved = false;
      await updated.save();
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getTrending = async (req, res) => {
  try {
    const oneDayAgo = new Date(Date.now() - 24*60*60*1000);
    const trending = await Confession.find({
      createdAt: { $gt: oneDayAgo },
      isApproved: true
    })
      .sort({ 'reactions.likes': -1 })
      .limit(10);
    res.json(trending);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
