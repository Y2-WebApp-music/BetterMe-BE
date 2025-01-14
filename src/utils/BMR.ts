const BMR_calculate = (birth_date: Date, gender: number, weight: number, height: number, activity: number) => {

    const age = new Date().getFullYear() - new Date(birth_date).getFullYear();
    
    if (gender === 1) {
        var bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        var bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    switch (activity) {
        case 1:
            bmr *= 1.2;
            break;
        case 2:
            bmr *= 1.375;
            break;
        case 3:
            bmr *= 1.55;
            break;
        case 4:
            bmr *= 1.725;
            break;
        case 5:
            bmr *= 1.9;
            break;
        default:
            bmr *= 1.2;
            break;
    }

    return bmr;
};

export default BMR_calculate;
