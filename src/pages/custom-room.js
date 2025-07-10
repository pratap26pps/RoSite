"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Droplets,
  Settings,
  Shield,
  Monitor,
  Save,
  Share2,
  ShoppingCart,
  CheckCircle,
  Info,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const component = {
  id: "component-123",
  name: "Power Battery X",
  description: "High-performance battery for EVs.",
  price: 4999,
  image: "/images/battery-x.jpg",
  category: "Battery",
  features: [
    "Long lifespan",
    "Fast charging",
    "Lightweight",
    "Eco-friendly"
  ],
  isRecommended: true,  
};

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
  { id: "review", name: "Review", icon: CheckCircle }
];

export default function BuildPage() {

  const [currentStep, setCurrentStep] = useState(0);
  const [selectedComponents, setSelectedComponents] = useState({});
  const [savedConfigs, setSavedConfigs] = useState([]);

  const currentStepId = steps[currentStep].id;
  const currentComponents = components[currentStepId ] || [];

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

  const handleSaveConfig = () => {
    const config = {
      id: Date.now(),
      name: `Custom RO Build ${savedConfigs.length + 1}`,
      components: selectedComponents,
      totalPrice: finalPrice,
      date: new Date().toISOString()
    };
    setSavedConfigs(prev => [...prev, config]);
  };

  const renderStepContent = () => {
    if (currentStepId === "review") {
      return (
        <div className="space-y-6">
          <div className="  rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold   mb-4">
              Your Custom RO Configuration
            </h3>
            <div className="space-y-4">
              {Object.entries(selectedComponents).map(([category, component]) => (
                <div key={category} className="flex items-center justify-between p-4   rounded-lg">
                  <div>
                    <h4 className="font-medium  ">{component.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{component.description}</p>
                  </div>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    ₹{component.price.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Installation</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    ₹{installationPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-2">
                  <span>Total Price</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ₹{finalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Free Installation Included!
              </h3>
            </div>
            <p className="text-green-700 dark:text-green-300">
              Your custom RO system will be professionally installed by our certified technicians at no additional cost.
            </p>
          </div>

          <div className="flex gap-4">
            <Button variant="water" size="lg" className="flex-1">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Proceed to Checkout
            </Button>
            <Button variant="outline" size="lg" onClick={handleSaveConfig}>
              <Save className="h-5 w-5 mr-2" />
              Save Configuration
            </Button>
            <Button variant="outline" size="lg">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className=" rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
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
                    ? "border-blue-500 bg-blue-200 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-slate-600  hover:border-gray-300"
                }`}
                onClick={() => handleComponentSelect(component)}
              >
                {component.isRecommended && (
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}

                <div className="h-32 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-4xl text-blue-300 dark:text-blue-600">💧</div>
                </div>

                <h4 className="font-semibold mb-2 text-green-700">
                  {component.name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {component.description}
                </p>

                <div className="space-y-2 mb-4">
                  {component.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{component.price.toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button
            variant="water"
            onClick={handleNext}
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
    <div className="min-h-screen  relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-28">
        {/* Header */}
        <div className="mb-8">
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-200 mb-4">
            Build Your Custom RO System
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Design your perfect water purification system with our modular components
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-blue-500 bg-blue-500 text-white"
                      : isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-gray-300 dark:border-slate-600 text-gray-400"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <StepIcon className="h-6 w-6" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div className={`text-sm font-medium ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : isCompleted
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {step.name}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? "bg-green-500" : "bg-gray-300 dark:bg-slate-600"
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
         

        {/* Current Step Content */}
        {renderStepContent()}

        {/* Price Summary */}
        {currentStepId !== "review" && Object.keys(selectedComponents).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Current Configuration
            </h3>
            <div className="space-y-2">
              {Object.entries(selectedComponents).map(([category, component]) => (
                <div key={category} className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">{component.name}</span>
                  <span className="font-medium">₹{component.price.toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Subtotal</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
