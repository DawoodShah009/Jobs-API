const jwt = require('jsonwebtoken')
const Job = require('../model/job')
const { NotFoundError } = require('../error')
const getAllJobs = async (req, res) => {
  // const { name, userID } = req.user
  const job = await Job.find({ createdBy: req.user.userID })
  res.status(200).json({ job })
}

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userID
  const job = await Job.create(req.body)
  // res.send('Create a Job....')
  res.status(201).json({ job })
}
const getSingleJob = async (req, res) => {
  const {
    params: { id: jobID },
    user: { userID },
  } = req
  const job = await Job.findOne({ _id: jobID, createdBy: userID })
  if (!job) {
    throw new NotFoundError(`No job with id: ${jobID} exists!!!`)
  }
  res.status(200).json({ job })
  // res.send('Single Job...')
}
const updateJob = async (req, res) => {
  res.send('Update a Job...')
}
const deleteJob = async (req, res) => {
  res.send('Delete a Job...')
}

module.exports = {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
}
