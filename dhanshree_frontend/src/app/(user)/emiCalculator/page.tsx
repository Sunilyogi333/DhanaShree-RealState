"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calculator, DollarSign, Percent, Clock, PieChart } from "lucide-react";
import ConverterHeader from "@/components/ConverterHeader";

export default function EmiConverter() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [tenureType, setTenureType] = useState("monthly");
  const [results, setResults] = useState({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
  });

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate);
    const tenure = parseFloat(loanTenure);

    if (!principal || !rate || !tenure) {
      setResults({ emi: 0, totalInterest: 0, totalAmount: 0 });
      return;
    }

    // Convert annual rate to monthly rate
    const monthlyRate = rate / (12 * 100);

    // Convert tenure to months
    const tenureInMonths = tenureType === "yearly" ? tenure * 12 : tenure;

    // EMI calculation formula
    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
      (Math.pow(1 + monthlyRate, tenureInMonths) - 1);

    const totalAmount = emi * tenureInMonths;
    const totalInterest = totalAmount - principal;

    setResults({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount),
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure, tenureType]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConverterHeader
        title="EMI Calculator"
        description="Calculate your loan EMI, total interest payable, and total amount with our comprehensive EMI calculator"
        icon={<Calculator className="h-8 w-8 text-white" />}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <DollarSign className="h-6 w-6" />
                Loan Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label
                  htmlFor="loan-amount"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <DollarSign className="h-4 w-4" />
                  Loan Amount (NPR)
                </Label>
                <Input
                  id="loan-amount"
                  type="number"
                  placeholder="e.g., 1000000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-12 text-lg border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="interest-rate"
                  className="text-sm font-medium text-gray-700 flex items-center gap-2"
                >
                  <Percent className="h-4 w-4" />
                  Interest Rate (% per annum)
                </Label>
                <Input
                  id="interest-rate"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-12 text-lg border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Loan Tenure
                </Label>

                <RadioGroup
                  value={tenureType}
                  onValueChange={setTenureType}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly">Months</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yearly" id="yearly" />
                    <Label htmlFor="yearly">Years</Label>
                  </div>
                </RadioGroup>

                <Input
                  type="number"
                  placeholder={tenureType === "yearly" ? "e.g., 5" : "e.g., 60"}
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full h-12 text-lg border-2 border-gray-200 focus:border-sky-500 rounded-lg"
                />
              </div>

              <Button
                onClick={calculateEMI}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white h-12 text-lg font-medium"
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calculate EMI
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 pt-0">
            <CardHeader className="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-t-lg h-16">
              <CardTitle className="flex items-center gap-3 w-full h-full">
                <PieChart className="h-6 w-6" />
                EMI Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700">
                      Monthly EMI
                    </span>
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-green-800 mt-2">
                    {formatCurrency(results.emi)}
                  </div>
                </div>

                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-orange-700">
                      Total Interest Payable
                    </span>
                    <Percent className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="text-2xl font-bold text-orange-800 mt-2">
                    {formatCurrency(results.totalInterest)}
                  </div>
                </div>

                <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">
                      Total Amount (Principal + Interest)
                    </span>
                    <PieChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-800 mt-2">
                    {formatCurrency(results.totalAmount)}
                  </div>
                </div>
              </div>

              {results.emi > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    Payment Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(parseFloat(loanAmount) || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Interest Amount:</span>
                      <span className="font-medium">
                        {formatCurrency(results.totalInterest)}
                      </span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-semibold">
                      <span>Total Amount:</span>
                      <span>{formatCurrency(results.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Information Section */}
        <Card className="mt-12 shadow-lg pt-0">
          <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 h-16">
            <CardTitle className="text-gray-800 w-full h-full">
              How EMI is Calculated
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="h-6 w-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Principal Amount
                </h4>
                <p className="text-gray-600 text-sm">
                  The original loan amount you borrow
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Percent className="h-6 w-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Interest Rate
                </h4>
                <p className="text-gray-600 text-sm">
                  Annual percentage rate charged by lender
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-6 w-6 text-sky-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Loan Tenure
                </h4>
                <p className="text-gray-600 text-sm">
                  Duration to repay the loan completely
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
