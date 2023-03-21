export interface apiResponse {
    success: boolean
    message: string
    programs: Program[]
  }
  
  export interface Program {
    programID: string
    programNumber: string
    programName: string
    programDescription: string
    canDelete: boolean
    isActive: boolean
    programBudget: number
    isVirtual: boolean
  }
  