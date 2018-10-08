export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const getStateName = id => {
  let statename;
  switch (id) {
    case 8:
      statename = "Lagos";
      break;
    case 9:
      statename = "Abuja";
      break;
    case 10:
      statename = "Rivers";
      break;
    case 13:
      statename = "Abia";
      break;
    case 14:
      statename = "Adamawa";
      break;
    case 15:
      statename = "Akwa Ibom";
      break;
    case 17:
      statename = "Bauchi";
      break;
    case 18:
      statename = "Bayelsa";
      break;
    case 19:
      statename = "Benue";
      break;
    case 20:
      statename = "Borno";
      break;
    case 21:
      statename = "Cross River";
      break;
    case 22:
      statename = "Delta";
      break;
    case 23:
      statename = "Ebonyi";
      break;
    case 24:
      statename = "Edo";
      break;
    case 25:
      statename = "Ekiti";
      break;
    case 26:
      statename = "Gombe";
      break;
    case 27:
      statename = "Imo";
      break;
    case 28:
      statename = "Jigawa";
      break;
    case 29:
      statename = "Kaduna";
      break;
    case 30:
      statename = "Kano";
      break;
    case 31:
      statename = "Katsina";
      break;
    case 32:
      statename = "Kebbi";
      break;
    case 33:
      statename = "Kogi";
      break;
    case 34:
      statename = "Kwara";
      break;
    case 35:
      statename = "Nasarawa";
      break;
    case 36:
      statename = "Niger";
      break;
    case 37:
      statename = "Ogun";
      break;
    case 38:
      statename = "Ondo";
      break;
    case 39:
      statename = "Osun";
      break;
    case 40:
      statename = "Oyo";
      break;
    case 41:
      statename = "Plateau";
      break;
    case 42:
      statename = "Sokoto";
      break;
    case 43:
      statename = "Taraba";
      break;
    case 44:
      statename = "Yobe";
      break;
    case 45:
      statename = "Zamfara";
      break;
    case 46:
      statename = "Enugu";
      break;
    case 52:
      statename = "Anambra";
      break;
  }

  return statename;
};
