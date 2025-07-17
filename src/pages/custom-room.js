"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import {
  Droplets,
  Settings,
  Shield,
  Monitor,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  ShoppingCart
} from "lucide-react";

const components = {
  filters: [
    {
      id: "filter-basic",
      name: "Basic 5-Stage Filter",
      description: "Standard filtration for normal water quality",
      price: 2999,
      image: "/components/filter-basic.jpg",
      category: "filters",
      features: ["5-Stage Filtration", "Sediment Filter", "Carbon Filter", "RO Membrane"]
    },
    {
      id: "filter-premium",
      name: "Premium 8-Stage Filter",
      description: "Advanced filtration with UV protection",
      price: 5999,
      image: "/components/filter-premium.jpg",
      category: "filters",
      features: ["8-Stage Filtration", "UV Protection", "TDS Controller", "Alkaline Filter"],
      isRecommended: true
    },
    {
      id: "filter-commercial",
      name: "Commercial Multi-Stage Filter",
      description: "High-capacity filtration for commercial use",
      price: 12999,
      image: "/components/filter-commercial.jpg",
      category: "filters",
      features: ["Multi-Stage Filtration", "High Capacity", "Auto Flush", "Digital Control"]
    }
  ],
  storage: [
    {
      id: "storage-8l",
      name: "8L Storage Tank",
      description: "Standard storage for small families",
      price: 1999,
      image: "/components/storage-8l.jpg",
      category: "storage",
      features: ["8L Capacity", "Food Grade", "Pressure Tank"]
    },
    {
      id: "storage-12l",
      name: "12L Storage Tank",
      description: "Large storage for bigger families",
      price: 2499,
      image: "/components/storage-12l.jpg",
      category: "storage",
      features: ["12L Capacity", "Food Grade", "Pressure Tank"],
      isRecommended: true
    },
    {
      id: "storage-20l",
      name: "20L Commercial Tank",
      description: "Commercial grade storage tank",
      price: 3999,
      image: "/components/storage-20l.jpg",
      category: "storage",
      features: ["20L Capacity", "Commercial Grade", "High Pressure"]
    }
  ],
  body: [
    {
      id: "body-compact",
      name: "Compact Body",
      description: "Space-saving design for small kitchens",
      price: 1999,
      image: "/components/body-compact.jpg",
      category: "body",
      features: ["Compact Design", "Wall Mount", "Space Saving"]
    },
    {
      id: "body-standard",
      name: "Standard Body",
      description: "Traditional design with easy access",
      price: 2499,
      image: "/components/body-standard.jpg",
      category: "body",
      features: ["Standard Design", "Easy Access", "Durable"],
      isRecommended: true
    },
    {
      id: "body-premium",
      name: "Premium Body",
      description: "Premium finish with LED display",
      price: 3999,
      image: "/components/body-premium.jpg",
      category: "body",
      features: ["Premium Finish", "LED Display", "Touch Controls"]
    }
  ],
  uv: [
    {
      id: "uv-none",
      name: "No UV Protection",
      description: "Basic system without UV",
      price: 0,
      image: "/components/uv-none.jpg",
      category: "uv",
      features: ["Basic Protection", "Cost Effective"]
    },
    {
      id: "uv-standard",
      name: "Standard UV Protection",
      description: "UV protection for additional safety",
      price: 1999,
      image: "/components/uv-standard.jpg",
      category: "uv",
      features: ["UV Protection", "Bacteria Elimination", "Additional Safety"],
      isRecommended: true
    },
    {
      id: "uv-advanced",
      name: "Advanced UV System",
      description: "Advanced UV with monitoring",
      price: 3999,
      image: "/components/uv-advanced.jpg",
      category: "uv",
      features: ["Advanced UV", "Monitoring System", "Auto Shutoff"]
    }
  ]
};

const steps = [
  { id: "filters", name: "Filters", icon: Droplets },
  { id: "storage", name: "Storage", icon: Settings },
  { id: "body", name: "Body", icon: Monitor },
  { id: "uv", name: "UV Protection", icon: Shield },
  { id: "review", name: "Review", icon: CheckCircle },
 { id: "filters", name: "Filters", icon: Droplets },
  { id: "storage", name: "Storage", icon: Settings },
  { id: "body", name: "Body", icon: Monitor },
  { id: "uv", name: "UV Protection", icon: Shield },
  { id: "review", name: "Review", icon: CheckCircle }
];
export default function BuildPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedComponents, setSelectedComponents] = useState({});
  const [savedConfigs, setSavedConfigs] = useState([]);
  const router = useRouter();
  const currentStepId = steps[currentStep].id;
  const currentComponents = components[currentStepId] || [];

  const totalPrice = Object.values(selectedComponents).reduce((sum, component) => sum + component.price, 0);
  const installationPrice = 999;
  const finalPrice = totalPrice + installationPrice;

  const handleComponentSelect = (component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [component.category]: component
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    if (currentStepId === "review") {
      return (
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Your Custom RO Configuration
            </h3>
            <div className="space-y-4">
              {Object.entries(selectedComponents).map(([category, component]) => (
                <div key={category} className="flex items-center justify-between p-4 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">{component.name}</h4>
                    <p className="text-sm text-gray-600">{component.description}</p>
                  </div>
                  <span className="font-semibold text-blue-600">
                    ₹{component.price.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Installation</span>
                  <span className="font-semibold text-blue-600">
                    ₹{installationPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-2">
                  <span>Total Price</span>
                  <span className="text-blue-600">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">
                Free Installation Included!
              </h3>
            </div>
            <p className="text-green-700">
              Your custom RO system will be professionally installed by our certified technicians at no additional cost.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="cursor-pointer text-gray-100"
            >
              <ArrowLeft className="h-4 w-4 mr-2 " />
              Previous
            </Button>

            <div className="w-full sm:w-auto sm:ml-auto">
              <Button
                onClick={() => router.push("/customer/billingorder")}
                className="w-full cursor-pointer sm:w-64 bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-300 rounded-xl px-6 py-4 text-base font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 " />
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      );
    }
return (
  <div className="space-y-6">
    <div className="bg-white rounded-xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Select {steps[currentStep].name}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentComponents.map((component) => (
          <motion.div
            key={component.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
              selectedComponents[component.category]?.id === component.id
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-300"
            }`}
            onClick={() => handleComponentSelect(component)}
          >
            {component.isRecommended && (
              <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Recommended
              </div>
            )}

            <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg mb-4 flex items-center justify-center">
              <div className="text-4xl text-blue-600">💧</div>
            </div>

            <h4 className="font-semibold mb-2 text-green-700">
              {component.name}
            </h4>
            <p className="text-sm text-gray-600 mb-3">
              {component.description}
            </p>

            <div className="space-y-2 mb-4">
              {component.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 text-xs text-gray-500"
                >
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* <div className="text-xl font-bold text-blue-700">
              ₹{component.price.toLocaleString()}
            </div> */}
          </motion.div>
        ))}
      </div>
    </div>

    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={handlePrevious}
        disabled={currentStep === 0}
        className="cursor-pointer text-gray-100"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      <Button
        variant="outline"
        onClick={handleNext}
        className="cursor-pointer text-gray-100"
        disabled={!selectedComponents[currentStepId]}
      >
        Next
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  </div>
);

  };

 return (
  <div className="min-h-screen relative bg-white text-gray-800">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Build Your Custom RO System
        </h1>
        <p className="text-lg text-gray-600">
          Design your perfect water purification system with our modular components
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        {/* Mobile Layout */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                      isActive
                        ? "border-blue-500 bg-blue-500 text-white"
                        : isCompleted
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-wrap mt-6 gap-4 items-center justify-center">
            {steps.map((_, index) =>
              index < steps.length - 1 ? (
                <div
                  key={index}
                  className={`flex-1 h-0.5 max-w-[60px] ${
                    index < currentStep ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ) : null
            )}
          </div>
        </div>

        {/* Large Screen Layout */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                        isActive
                          ? "border-blue-500 bg-blue-500 text-white"
                          : isCompleted
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <StepIcon className="h-6 w-6" />
                      )}
                    </div>
                    <div className="mt-2 text-center">
                      <div
                        className={`text-sm font-medium whitespace-nowrap ${
                          isActive
                            ? "text-blue-600"
                            : isCompleted
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {step.name}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 -mt-5 mx-4">
                      <div
                        className={`h-0.5 w-full transition-colors ${
                          index < currentStep ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      {renderStepContent()}

      {/* Price Summary */}
      {currentStepId !== "review" && Object.keys(selectedComponents).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4">Current Configuration</h3>
          <div className="space-y-2">
            {Object.entries(selectedComponents).map(([category, component]) => (
              <div key={category} className="flex justify-between text-sm">
                <span className="text-gray-600">{component.name}</span>
         
              </div>
            ))}
 
          </div>
        </motion.div>
      )}
    </div>
  </div>
);

}
