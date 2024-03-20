import React from "react";

// percentile
// rank
// selectedYear
// selectedCategory
// selectedRound
// selectedBranch
// selectedCollege
// resultDisplayLimit

// ### Api results ### 
// yearList
// categoryList
// yearData
// yearList
// branchList
// collegeList

const ApiContext = React.createContext();

const DataContext = ({children}) => {



    return (
        <ApiContext.Provider>
            {!loading && children}
        </ApiContext.Provider>
    )
}
