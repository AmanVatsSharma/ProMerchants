"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
    label: string
    description?: string
}

interface StepperProps {
    steps: Step[]
    currentStep: number
    className?: string
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, className = '' }) => {
    return (
        <nav aria-label="Progress" className={className}>
            <ol className="flex items-center">
                {steps.map((step, index) => (
                    <li key={step.label} className={`${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
                        {index < currentStep ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-green-600" />
                                </div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="relative w-8 h-8 flex items-center justify-center bg-green-600 rounded-full"
                                >
                                    <Check className="w-5 h-5 text-white" />
                                </motion.div>
                            </>
                        ) : index === currentStep ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-green-600 rounded-full"
                                >
                                    <span className="h-2.5 w-2.5 bg-green-600 rounded-full" />
                                </motion.div>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-gray-200" />
                                </div>
                                <div className="relative w-8 h-8 flex items-center justify-center bg-white border-2 border-gray-300 rounded-full">
                                    <span className="h-2.5 w-2.5 bg-transparent rounded-full" />
                                </div>
                            </>
                        )}
                        <div className="mt-3">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                {step.label}
                            </span>
                            {step.description && (
                                <p className="mt-1 text-sm font-medium text-gray-900">{step.description}</p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Stepper