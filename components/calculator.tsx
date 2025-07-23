'use client'

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

export default function NPICalculator() {
  const [tumourSize, setTumourSize] = useState('');
  const [grade, setGrade] = useState('');
  const [nodeStatus, setNodeStatus] = useState('');
  const [npiResult, setNpiResult] = useState<string | null>(null);
  const [prognosis, setPrognosis] = useState('');

  const calculateNPI = () => {
    const size = parseFloat(tumourSize);
    const histologicalGrade = parseInt(grade);
    const lymphNodeStage = parseInt(nodeStatus);
    
    // Validate inputs
    if (isNaN(size) || size <= 0) {
      alert('Please enter a valid tumour size');
      return;
    }
    
    if (isNaN(histologicalGrade) || histologicalGrade < 1 || histologicalGrade > 3) {
      alert('Please select a histological grade');
      return;
    }
    
    if (isNaN(lymphNodeStage) || lymphNodeStage < 1 || lymphNodeStage > 3) {
      alert('Please select a lymph node status');
      return;
    }
    
    // Calculate NPI
    const npi = (0.2 * size) + lymphNodeStage + histologicalGrade;
    setNpiResult(npi.toString());
    
    // Determine prognosis
    if (npi <= 2.4) {
      setPrognosis('Excellent');
    } else if (npi <= 3.4) {
      setPrognosis('Good');
    } else if (npi <= 5.4) {
      setPrognosis('Moderate');
    } else {
      setPrognosis('Poor');
    }
  };

  const getPrognosisColor = () => {
    const npi = parseFloat(npiResult!);
    if (npi <= 2.4) return 'bg-primary text-primary-foreground border-primary';
    if (npi <= 3.4) return 'bg-secondary text-secondary-foreground border-secondary';
    if (npi <= 5.4) return 'bg-accent text-accent-foreground border-accent';
    return 'bg-destructive text-destructive-foreground border-destructive';
  };

  const getSurvivalRate = () => {
    const npi = parseFloat(npiResult!);
    if (npi <= 2.4) return '95%';
    if (npi <= 3.4) return '85%';
    if (npi <= 5.4) return '70%';
    return '50%';
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-sm mx-auto space-y-6">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-foreground mb-8">
          NPI Calculator
        </h1>

        {/* Input Form */}
        <Card>
          <CardContent className="p-6 space-y-6">
            
            {/* Tumour Size */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Tumour size (cm)
              </Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.1"
                  value={tumourSize}
                  onChange={(e) => setTumourSize(e.target.value)}
                  placeholder="Enter size"
                  className="text-md pr-12"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  cm
                </span>
              </div>
            </div>

            {/* Grade */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Histological grade
              </Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="text-md w-full">
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Well differentiated</SelectItem>
                  <SelectItem value="2">2 - Moderately differentiated</SelectItem>
                  <SelectItem value="3">3 - Poorly differentiated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lymph Node */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">
                Lymph node stage
              </Label>
              <Select value={nodeStatus} onValueChange={setNodeStatus}>
                <SelectTrigger className=" text-md w-full">
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - No involvement</SelectItem>
                  <SelectItem value="2">2 - 1-3 nodes</SelectItem>
                  <SelectItem value="3">3 - 4+ nodes</SelectItem>
                </SelectContent>
              </Select>
            </div>

          </CardContent>
        </Card>

        {/* Calculate Button */}
        <Button 
          onClick={calculateNPI} 
          className="w-full h-12 text-lg font-semibold rounded-full"
        >
          Calculate NPI
        </Button>

        {/* Results */}
        {npiResult && (
          <Card>
            <CardContent className="p-6 text-center space-y-4">
              <div className="text-4xl font-bold text-foreground">
                {npiResult}
              </div>
              <Badge variant="outline" className={`text-base px-4 py-2 ${getPrognosisColor()}`}>
                {prognosis}
              </Badge>
              <div className="text-muted-foreground">
                15-year survival: {getSurvivalRate()}
              </div>
              
              {/* Simple calculation display */}
              <div className="mt-6 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
                <div className="font-mono">
                  {tumourSize} × 0.2 + {nodeStatus} + {grade} = {npiResult}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}