const {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
} = require('../controller/jobs')

const express = require('express')
const router = express.Router()

router.route('/').get(getAllJobs).post(createJob)
router.route('/:id').get(getSingleJob).patch(updateJob).delete(deleteJob)

module.exports = router
