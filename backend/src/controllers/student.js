import Notification from '../models/Notification.js';
import Ticket from '../models/Ticket.js';
import User from '../models/User.js';
import Student from './../models/Student.js';

export const getProfile = async (req, res) => {
  try {
    const data = await Student.findOne({ user: req.params.id });
    return res.status(200).json({ data });
  } catch (error) {
    console.log(error);
  }
};

export const addProfile = async (req, res) => {
  try {
    console.log(req.body);
    await Student.create(req.body);
    await User.findByIdAndUpdate(
      req.body.user,
      { hasProfile: true },
      { new: true }
    );
    await Notification.create({
      studentName: req.body.studentName,
      message: req.body.studentName + ' created his profile.',
    });
    return res
      .status(200)
      .json({ success: true, message: 'Student created succesfully' });
  } catch (error) {
    console.log(error);
  }
};

export const submitTicket = async (req, res) => {
  try {
    console.log(req.body);
    const student = await Student.findOne({ user: req.body.id });
    await Ticket.create({ ...req.body, studentPhone: student.studentPhone });
    await Notification.create({
      studentName: req.body.studentName,
      message: req.body.studentName + ' opened a new ticket.',
    });
    return res
      .status(200)
      .json({ success: true, message: 'Ticket created succesfully' });
  } catch (error) {
    console.log(error);
  }
};

export const getTicket = async (req, res) => {
  try {
    const tt = await Ticket.find({}).sort({ field: 'asc', createdAt: -1 });
    return res.status(200).json({ success: true, tickets: tt });
  } catch (error) {
    console.log(error);
  }
};

export const getOneTicket = async (req, res) => {
  try {
    const tt = await Ticket.findById(req.params.id);
    return res.status(200).json({ success: true, ticket: tt });
  } catch (error) {
    console.log(error);
  }
};

export const resolveTicket = async (req, res) => {
  try {
    const t = await Ticket.findById(req.params.id);
    await Ticket.findByIdAndUpdate(
      req.params.id,
      { pending: false },
      { new: true }
    );
    await Notification.create({
      studentName: t.studentName,
      message: t.studentName + ' ticket now resolved.',
    });
    return res.status(200).json({ success: true, message: 'Ticket resolved' });
  } catch (error) {
    console.log(error);
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({}).sort({
      field: 'asc',
      createdAt: -1,
    });
    return res.status(200).json({ success: true, notifications });
  } catch (error) {
    console.log(error);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: 'notifcation deleted' });
  } catch (error) {
    console.log(error);
  }
};


/***************************/





export const addTicket = async (req,res) => {
  try {
    const {title, studentName, studentEmail, studentPhone,message,pending} = req.body;
    if(! title || ! studentName || !   studentEmail || ! studentPhone || !message|| !pending) return res.status(403).json({message : 'Invalid Data'});
    const event = new event({ title, studentName, studentEmail, studentPhone,message,pending});
    await event.save();  
    res.status(200).json({message : "reclamation Saved Succesfully !", event});
  } catch (error) {
    console.log('INTERNALE ERROR', error);
  }
}

export const updateTicket = async(req,res) => {
  try {
    const {id} = req.params;
    const { title, studentName, studentEmail, studentPhone,message,pending} = req.body;
    if (!ObjectId.isValid(id)) return res.status(404).json({message: 'Not Valid Id'});
    const event = await event.findById(id);
    if (!event) return res.status(404).json({message: 'reclamation not found'});
    const updatedevent = { title, studentName, studentEmail, studentPhone,message,pending};
    await event.findByIdAndUpdate(id,{ $set: updatedevent },{ new: true });
    res.status(200).json({message:"reclamation updated succesfully"});
  } catch (error) {
    console.log('INTERNAL ERROR', error);
  }
}

export const deleteTicket = async(req,res) => {
  try {
    const {id} = req.params;
    if (!ObjectId.isValid(id)) return res.status(404).json({message: 'Not Valid Id'});
    const event = await event.findById(id);
    if (!event) return res.status(404).json({message: 'reclamation not found'});
    await event.findOneAndDelete({_id : id});
    res.status(200).json({message:"reclamation deleted succesfully"});
  } catch (error) {
    console.log('INTERNAL ERROR', error);
  }
}