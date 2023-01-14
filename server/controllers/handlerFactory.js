/* This factory will hold all duplicate Requests Namely:
1) getAll
2) getOne
3) createOne
4) updateOne
5) deleteOne
*/
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAll = (Model) =>
  // We pass in the Model to the function and then the query is run
  // This makes the code suitable for multiple models
  catchAsync(async (req, res, next) => {
    let query = Model.find();
    const doc = await query;
    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions); // This adds the populate to the qury IF there is a populate method
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body); // To create a new Object...You pass in the body of the request which is <req.body>

    res.status(201).json({
      status: 'Success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); // To find a specific doc and update it...You pass in the Id param <req.param.id>

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id); // We dont save this to a value

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      //204 are for delete requests
      status: 'success',
      data: null, // Cause we send nothing back after deleting
    });
  });
