// Dummy cost calculator logic – adjust as needed
export const calculateCost = ({ selectedActivities, shareholders, totalVisas, tenure, entityType }) => {
  let baseCost = 5000;
  let activityCost = selectedActivities.length * 1000;
  let shareholderCost = shareholders * 2000;
  let visaCost = totalVisas * 1500;
  let tenureCost = tenure * 500;
  let entityCost = entityType === "LLC" ? 3000 : 2000;

  let estimatedCost = baseCost + activityCost + shareholderCost + visaCost + tenureCost + entityCost;

  let recommendedPackage = {
    name: "Standard Package",
    price: estimatedCost,
    features: ["Basic registration", "1-year license", "Standard support"]
  };

  let alternativePackages = [
    { name: "Premium Package", price: estimatedCost + 5000, features: ["Faster setup", "Extra visa", "Premium support"] },
    { name: "Budget Package", price: estimatedCost - 2000, features: ["Basic support only", "Limited activities"] }
  ];

  let costBreakdown = {
    baseCost,
    activityCost,
    shareholderCost,
    visaCost,
    tenureCost,
    entityCost
  };

  let isFreezone = entityType?.toLowerCase() === "freezone";

  return { estimatedCost, recommendedPackage, alternativePackages, costBreakdown, isFreezone };
};
