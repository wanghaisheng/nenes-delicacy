const levenshteinDistance = (a, b) => {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
                );
            }
        }
    }

    return matrix[b.length][a.length];
};

const getClosestDomain = (inputDomain, popularDomains, threshold = 2) => {
    let closestDomain = '';
    let minDistance = Infinity;

    popularDomains.forEach((domain) => {
        const distance = levenshteinDistance(inputDomain, domain);
        if (distance < minDistance && distance <= threshold) {
            minDistance = distance;
            closestDomain = domain;
        }
    });

    return closestDomain;
};

const emailValidator = (email) => {
    const popularDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com'];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let emailValid = emailRegex.test(email);
    let msg = null;

    if (!emailValid) {
        msg = 'Please enter a valid email address';
        return { isValid: false, message: msg };
    }

    // Extract the domain part of the email
    let domain = email.split('@')[1];

    // Ignore dots before the domain
    domain = domain.replace(/^\.+/, '');

    // Extract the root domain by getting the last two parts of the domain
    const domainParts = domain.split('.');
    const rootDomain = domainParts.slice(-2).join('.');

    if (popularDomains.includes(rootDomain)) {
        // If the root domain matches a popular domain, it's valid
        return { isValid: true, message: null };
    } else {
        // If the root domain doesn't match, check if it's close to a popular domain
        const closestDomain = getClosestDomain(rootDomain, popularDomains);
        if (closestDomain && closestDomain !== rootDomain) {
            msg = `Did you mean ${email.split('@')[0]}@${closestDomain}?`;
            emailValid = false;
        } else {
            // If it's a business domain or not closely matching a popular domain, it's valid
            return { isValid: true, message: null };
        }
    }

    return { isValid: emailValid, message: msg };
};

export default emailValidator;