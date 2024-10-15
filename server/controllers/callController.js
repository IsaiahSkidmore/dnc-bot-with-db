import DNC from '../models/dnc.js';
import CallHistory from '../models/CallHistory.js';

export const addNumberToDNC = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    await DNC.create({ phoneNumber });
    res.status(201).json({ message: 'Number added to DNC list' });
  } catch (err) {
    res.status(500).json({ message: 'Could not add number to DNC list' });
  }
};

export const addNumberToCallHistory = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    await CallHistory.create({ phoneNumber, userId: req.user.id });
    res.status(201).json({ message: 'Number added to call history' });
  } catch (err) {
    res.status(500).json({ message: 'Could not add number to call history' });
  }
};

export const checkNumberInDNC = async (req, res) => {
  try {
      const { phoneNumber } = req.params;
      const numberInDnc = await DNC.findOne({ where: { phoneNumber } });

      if (numberInDnc) {
          res.json({ isInDnc: true });
      } else {
          res.json({ isInDnc: false });
      }
  } catch (err) {
      res.status(500).json({ message: 'Could not check DNC list' });
  }
};

export const getCallHistory = async (req, res) => {
  try {
    const callHistory = await CallHistory.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.json(callHistory);
  } catch (err) {
    res.status(500).json({ message: 'Could not retrieve call history' });
  }
};

const callController = {
  addNumberToDNC,
  addNumberToCallHistory,
  getCallHistory,
  checkNumberInDNC,
};

export default callController;