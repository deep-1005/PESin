// Intelligent skill matching algorithm for company recommendations

/**
 * Calculate match percentage between student skills and company requirements
 * @param {Array} studentSkills - Array of student's skills
 * @param {Array} requiredSkills - Array of company's required skills
 * @returns {Object} - Match details with percentage and matched skills
 */
export const calculateSkillMatch = (studentSkills, requiredSkills) => {
  if (!studentSkills || !requiredSkills || studentSkills.length === 0 || requiredSkills.length === 0) {
    return {
      matchPercentage: 0,
      matchedSkills: [],
      missingSkills: requiredSkills || []
    };
  }

  // Normalize skills to lowercase for comparison
  const normalizedStudentSkills = studentSkills.map(skill => skill.toLowerCase().trim());
  const normalizedRequiredSkills = requiredSkills.map(skill => skill.toLowerCase().trim());

  // Find matched skills
  const matchedSkills = normalizedRequiredSkills.filter(skill => 
    normalizedStudentSkills.includes(skill)
  );

  // Find missing skills
  const missingSkills = normalizedRequiredSkills.filter(skill => 
    !normalizedStudentSkills.includes(skill)
  );

  // Calculate match percentage
  const matchPercentage = (matchedSkills.length / normalizedRequiredSkills.length) * 100;

  return {
    matchPercentage: Math.round(matchPercentage),
    matchedSkills: matchedSkills,
    missingSkills: missingSkills,
    totalRequired: normalizedRequiredSkills.length,
    totalMatched: matchedSkills.length
  };
};

/**
 * Get recommended companies for a student based on skills
 * @param {Array} studentSkills - Student's skills
 * @param {Array} companies - Array of all companies
 * @param {Number} minMatchPercentage - Minimum match percentage threshold (default: 30)
 * @returns {Array} - Sorted array of recommended companies
 */
export const getRecommendedCompanies = (studentSkills, companies, minMatchPercentage = 30) => {
  if (!studentSkills || studentSkills.length === 0) {
    return [];
  }

  const recommendations = companies
    .map(company => {
      const matchResult = calculateSkillMatch(studentSkills, company.requiredSkills);
      
      return {
        company: company,
        matchDetails: matchResult
      };
    })
    .filter(rec => rec.matchDetails.matchPercentage >= minMatchPercentage)
    .sort((a, b) => b.matchDetails.matchPercentage - a.matchDetails.matchPercentage);

  return recommendations;
};

/**
 * Check if student meets job eligibility criteria
 * @param {Object} student - Student object
 * @param {Object} job - Job object with eligibility criteria
 * @returns {Object} - Eligibility status and reasons
 */
export const checkJobEligibility = (student, job) => {
  const reasons = [];
  let isEligible = true;

  // Check CGPA
  if (job.minCGPA && student.cgpa < job.minCGPA) {
    isEligible = false;
    reasons.push(`Minimum CGPA required: ${job.minCGPA} (You have: ${student.cgpa})`);
  }

  // Check branch eligibility
  if (job.eligibleBranches && job.eligibleBranches.length > 0 && !job.eligibleBranches.includes('All')) {
    if (!job.eligibleBranches.includes(student.branch)) {
      isEligible = false;
      reasons.push(`Your branch (${student.branch}) is not eligible. Eligible branches: ${job.eligibleBranches.join(', ')}`);
    }
  }

  // Check semester eligibility
  if (job.eligibleSemesters && job.eligibleSemesters.length > 0) {
    if (!job.eligibleSemesters.includes(student.semester)) {
      isEligible = false;
      reasons.push(`Your semester (${student.semester}) is not eligible. Eligible semesters: ${job.eligibleSemesters.join(', ')}`);
    }
  }

  // Check skills match
  if (job.requiredSkills && job.requiredSkills.length > 0) {
    const skillMatch = calculateSkillMatch(student.skills, job.requiredSkills);
    if (skillMatch.matchPercentage < 50) {
      reasons.push(`You match only ${skillMatch.matchPercentage}% of required skills. Consider developing: ${skillMatch.missingSkills.slice(0, 3).join(', ')}`);
    }
  }

  return {
    isEligible,
    reasons,
    recommendations: isEligible ? ['You meet all eligibility criteria!'] : reasons
  };
};

/**
 * Get skill suggestions based on industry trends
 * @param {String} branch - Student's branch
 * @returns {Array} - Suggested skills to learn
 */
export const getSuggestedSkills = (branch) => {
  const skillSuggestions = {
    'CSE': ['JavaScript', 'Python', 'React', 'Node.js', 'MongoDB', 'SQL', 'Git', 'Docker', 'AWS', 'Machine Learning'],
    'ISE': ['Python', 'Data Science', 'SQL', 'Tableau', 'Power BI', 'Machine Learning', 'Cloud Computing', 'Cybersecurity'],
    'ECE': ['Embedded C', 'VHDL', 'MATLAB', 'Python', 'IoT', 'Signal Processing', 'PCB Design', 'Arduino'],
    'EEE': ['MATLAB', 'Python', 'PLC', 'AutoCAD', 'Power Systems', 'Control Systems', 'Renewable Energy'],
    'ME': ['AutoCAD', 'SolidWorks', 'CATIA', 'ANSYS', 'CNC', 'CAM', 'Manufacturing', 'Thermodynamics'],
    'CE': ['AutoCAD', 'Revit', 'Staad Pro', 'Primavera', 'BIM', 'Structural Analysis', 'Construction Management'],
    'ETE': ['MATLAB', 'LabVIEW', 'Python', 'Instrumentation', 'Control Systems', 'Sensors', 'IoT'],
    'BT': ['Python', 'R', 'Bioinformatics', 'Molecular Biology', 'Genetics', 'Biochemistry', 'Lab Techniques']
  };

  return skillSuggestions[branch] || ['Communication', 'Problem Solving', 'Leadership', 'Project Management'];
};
