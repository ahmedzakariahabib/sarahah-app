export function catchError(fn) {
  //here i return function because i can't put call function in middleware
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      // this next go to global error handling middleware if there error
      next(err);
    });
  };
}
