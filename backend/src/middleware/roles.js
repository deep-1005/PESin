// Role-based access control middleware

// Check if user has one of the allowed roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please login.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this route`
      });
    }

    next();
  };
};

// Check if user is a student
export const isStudent = (req, res, next) => {
  if (!req.user || req.user.role !== 'student') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Students only.'
    });
  }
  next();
};

// Check if user is an alumni
export const isAlumni = (req, res, next) => {
  if (!req.user || req.user.role !== 'alumni') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Alumni only.'
    });
  }
  next();
};

// Check if user is an admin
export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin only.'
    });
  }
  next();
};

// Check if user is student or alumni
export const isStudentOrAlumni = (req, res, next) => {
  if (!req.user || !['student', 'alumni'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Students and Alumni only.'
    });
  }
  next();
};

// Check if user is admin or the owner of the resource
export const isAdminOrOwner = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please login.'
    });
  }

  const resourceUserId = req.params.userId || req.params.id;

  if (req.user.role === 'admin' || req.user._id.toString() === resourceUserId) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: 'Access denied. You can only access your own resources.'
  });
};

// Check if user account is approved
export const checkApproval = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized. Please login.'
    });
  }

  if (!req.user.isApproved && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Your account is pending approval by admin. Please wait for activation.'
    });
  }

  next();
};
