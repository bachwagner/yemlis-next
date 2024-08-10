import mongoose  from 'mongoose'

const humanHealthEffectEnums = ["essential", "nonEssential", "neutral", "risky", "toxic"]


const nutritionInfo = new mongoose.Schema({
  name: {  
    type: String,
    required: [true, "nutritionInfo name is required"],
    minLength: [2, "too short nutritionInfo length"],
    maxLength: [50, "too long nutritionInfo length"],
},
  items: [{ // vitamin, minerals
    type: mongoose.Schema.Types.ObjectId,
    ref: "NutritionInfo"
  }],
 measurables:[{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Measurables"
 }],
  humanHealthEffect: {
    type: String,
    enum: {
      values: humanHealthEffectEnums ,
      message: "Wrong humanHealthEffectEnums Option"
    },
  },
  creationInfos: {
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        createdAt: {
            type: Date,
            default: () => Date.now()

        },
        updatedAt: {
            type: Date,
            default: () => Date.now()

        },
        isBlocked: {
            type:Boolean,
            default: false,
        },
        
    }
}

})

export default mongoose.model("NutritionInfo", nutritionInfo)


/*
    DRI is the general term for a set of reference values
  used to plan and assess nutrient intakes of healthy people. 
  These values, which vary by age and sex, include:
  - Recommended Dietary Allowance (RDA): 
    Average daily level of intake sufficient to meet the nutrient requirements of nearly all (97–98%)
  healthy individuals; often used to plan nutritionally adequate diets
  for individuals.
  -Adequate Intake (AI): 
    Intake at this level is assumed
  to ensure nutritional adequacy; established when evidence is 
  insufficient to develop an RDA.
  -Estimated Average Requirement (EAR):
    Average daily level of intake estimated to meet the requirements 
  of 50% of healthy individuals; usually used to assess the nutrient 
  intakes of groups of people and to plan nutritionally adequate diets
  for them; can also be used to assess the nutrient intakes of 
  individuals.
  -Tolerable Upper Intake Level (UL): Maximum daily intake unlikely to
   cause adverse health effects.

*/ 