import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import dayjs from "dayjs";
import * as XLSX from "xlsx";

const AttendanceModuleFaculty = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:5000/attendance/api/attendance", {
        params: {
          personId: employeeNumber,
          startDate,
          endDate,
        },
      });

      const processedData = response.data.map((row) => {
        const { timeIN, timeOUT, breaktimeIN, breaktimeOUT, officialBreaktimeIN, officialBreaktimeOUT, officialTimeIN, officialTimeOUT, officialHonorariumTimeIN, officialHonorariumTimeOUT, officialServiceCreditTimeIN, officialServiceCreditTimeOUT, officialOverTimeIN, officialOverTimeOUT } = row;

        const defaultTime = "132:00:00 AM";
        // Parse the times for comparison
        const parsedDefaultTime = dayjs(`2024-01-01 ${defaultTime}`, "YYYY-MM-DD hh:mm:ss A");

        const parsedTimeIN = dayjs(`2024-01-01 ${timeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedTimeOUT = dayjs(`2024-01-01 ${timeOUT}`, "YYYY-MM-DD hh:mm:ss A");
        const parsedBreaktimeIN = dayjs(`2024-01-01 ${breaktimeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedBreaktimeOUT = dayjs(`2024-01-01 ${breaktimeOUT}`, "YYYY-MM-DD hh:mm:ss A");
        const parsedOfficialBreaktimeIN = dayjs(`2024-01-01 ${officialBreaktimeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedOfficialBreaktimeOUT = dayjs(`2024-01-01 ${officialBreaktimeOUT}`, "YYYY-MM-DD hh:mm:ss A");
        const parsedOfficialTimeIN = dayjs(`2024-01-01 ${officialTimeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedOfficialTimeOUT = dayjs(`2024-01-01 ${officialTimeOUT}`, "YYYY-MM-DD hh:mm:ss A");
        const parsedOfficialHonorariumTimeIN = dayjs(`2024-01-01 ${officialHonorariumTimeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedOfficialHonorariumTimeOUT = dayjs(`2024-01-01 ${officialHonorariumTimeOUT}`, "YYYY-MM-DD hh:mm:ss A");
        const parsedOfficialServiceCreditTimeIN = dayjs(`2024-01-01 ${officialServiceCreditTimeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedOfficialServiceCreditTimeOUT = dayjs(`2024-01-01 ${officialServiceCreditTimeOUT}`, "YYYY-MM-DD hh:mm:ss A");
        const parsedOfficialOverTimeIN = dayjs(`2024-01-01 ${officialOverTimeIN}`, "YYYY-MM-DD hh:mm:ss A"); // Example date
        const parsedOfficialOverTimeOUT = dayjs(`2024-01-01 ${officialOverTimeOUT}`, "YYYY-MM-DD hh:mm:ss A");

        const OfficialTimeMorning = parsedTimeIN.isBefore(parsedOfficialTimeIN) ? parsedOfficialTimeIN.format("hh:mm:ss A") : parsedTimeIN.format("hh:mm:ss A");

        const OfficialTimeAfternoon = parsedTimeOUT.isAfter(parsedOfficialTimeOUT) ? parsedOfficialTimeOUT.format("hh:mm:ss A") : parsedTimeOUT.format("hh:mm:ss A");

        const HonorariumTimeIN = parsedTimeIN.isBefore(parsedOfficialHonorariumTimeIN) ? parsedOfficialHonorariumTimeIN.format("hh:mm:ss A") : parsedTimeIN.format("hh:mm:ss A");

        const HonorariumTimeOUT = parsedTimeOUT.isAfter(parsedOfficialHonorariumTimeOUT) ? parsedOfficialHonorariumTimeOUT.format("hh:mm:ss A") : parsedTimeOUT.format("hh:mm:ss A");

        const ServiceCreditTimeIN = parsedTimeIN.isBefore(parsedOfficialServiceCreditTimeIN) ? parsedOfficialServiceCreditTimeIN.format("hh:mm:ss A") : parsedTimeIN.format("hh:mm:ss A");

        const ServiceCreditTimeOUT = parsedTimeOUT.isAfter(parsedOfficialServiceCreditTimeOUT) ? parsedOfficialServiceCreditTimeOUT.format("hh:mm:ss A") : parsedTimeOUT.format("hh:mm:ss A");

        const OverTimeIN = parsedTimeIN.isBefore(parsedOfficialOverTimeIN) ? parsedOfficialOverTimeIN.format("hh:mm:ss A") : parsedTimeIN.format("hh:mm:ss A");

        const OverTimeOUT = parsedTimeOUT.isAfter(parsedOfficialOverTimeOUT) ? parsedOfficialOverTimeOUT.format("hh:mm:ss A") : parsedTimeOUT.format("hh:mm:ss A");

        const OfficialBreakAM = parsedBreaktimeIN.isAfter(parsedOfficialBreaktimeIN) ? parsedOfficialBreaktimeIN.format("hh:mm:ss A") : parsedBreaktimeIN.format("hh:mm:ss A");

        const OfficialBreakPM = parsedBreaktimeOUT.isAfter(parsedOfficialBreaktimeOUT) ? parsedBreaktimeOUT.format("hh:mm:ss A") : parsedOfficialBreaktimeOUT.format("hh:mm:ss A");

        // // start faculty render

        // // rendered time
        // // Convert time strings to Date objects
        // const startDateFaculty = new Date(`01/01/2000 ${timeIN}`);
        // const endDateFaculty = new Date(`01/01/2000 ${timeOUT}`);
        // const startOfficialTimeFaculty = new Date(`01/01/2000 ${officialTimeIN}`);
        // const endOfficialTimeFaculty = new Date(`01/01/2000 ${officialTimeOUT}`);

        // const defaultTimeFaculty = "00:00:00 AM";
        // const midnightFaculty = new Date(`01/01/2000 ${defaultTimeFaculty}`);

        // const timeinfaculty = startDateFaculty > endOfficialTimeFaculty ? midnightFaculty : startDateFaculty < startOfficialTimeFaculty ? startOfficialTimeFaculty : startDateFaculty;
        // const timeoutfaculty = timeinfaculty === midnightFaculty ? midnightFaculty : endDateFaculty < endOfficialTimeFaculty ? endDateFaculty : endOfficialTimeFaculty;

        // // Calculate difference in milliseconds
        // const diffMs = timeoutfaculty - timeinfaculty;

        // // Convert milliseconds to hours, minutes, seconds
        // const hoursFaculty = Math.floor(diffMs / (1000 * 60 * 60));
        // const minutesFaculty = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        // const secondsFaculty = Math.floor((diffMs % (1000 * 60)) / 1000);

        // // Format output as HH:MM:SS RENDERERED TIME
        // const formattedFacultyRenderedTime = [String(hoursFaculty).padStart(2, "0"), String(minutesFaculty).padStart(2, "0"), String(secondsFaculty).padStart(2, "0")].join(":");

        // //end rendered time

        // //  max rendered time

        // // Calculate difference in milliseconds MAX RENDERED TIME
        // const diffMsFaculty = endOfficialTimeFaculty - startOfficialTimeFaculty;

        // // Convert milliseconds to hours, minutes, seconds
        // const hoursFacultyMRT = Math.floor(diffMsFaculty / (1000 * 60 * 60));
        // const minutesFacultyMRT = Math.floor((diffMsFaculty % (1000 * 60 * 60)) / (1000 * 60));
        // const secondsFacultyMRT = Math.floor((diffMsFaculty % (1000 * 60)) / 1000);

        // // Format output as HH:MM:SS
        // const formattedFacultyMaxRenderedTime = [String(hoursFacultyMRT).padStart(2, "0"), String(minutesFacultyMRT).padStart(2, "0"), String(secondsFacultyMRT).padStart(2, "0")].join(":");

        // // Calculate difference in milliseconds MAX RENDERED TIME

        // const tardFinalformattedFacultyRenderedTime = new Date(`01/01/2000 ${formattedFacultyRenderedTime}`);
        // const tardFinalformattedFacultyMaxRenderedTime = new Date(`01/01/2000 ${formattedFacultyMaxRenderedTime}`);

        // const finalcalcFaculty = tardFinalformattedFacultyMaxRenderedTime - tardFinalformattedFacultyRenderedTime;

        // // Convert milliseconds to hours, minutes, seconds
        // const hoursfinalcalcFaculty = Math.floor(finalcalcFaculty / (1000 * 60 * 60));
        // const minutesfinalcalcFaculty = Math.floor((finalcalcFaculty % (1000 * 60 * 60)) / (1000 * 60));
        // const secondsfinalcalcFaculty = Math.floor((finalcalcFaculty % (1000 * 60)) / 1000);

        // // Format output as HH:MM:SS
        // const formattedfinalcalcFaculty = [String(hoursfinalcalcFaculty).padStart(2, "0"), String(minutesfinalcalcFaculty).padStart(2, "0"), String(secondsfinalcalcFaculty).padStart(2, "0")].join(":");

        // // // end max rendered time




        const defaultTimeFaculty = "00:00:00 AM";
        const midnightFaculty = new Date(`01/01/2000 ${defaultTimeFaculty}`);






        

 // start faculty render AM --------------------------------------------------------
 
 
 // start faculty render PM

        // rendered time
        // Convert time strings to Date objects
        const startDateFacultyAM = new Date(`01/01/2000 ${timeIN}`);
        const endDateFacultyAM = new Date(`01/01/2000 ${officialBreaktimeIN}`);
        const startOfficialTimeFacultyAM = new Date(`01/01/2000 ${officialTimeIN}`);
        const endOfficialTimeFacultyAM = new Date(`01/01/2000 ${officialBreaktimeIN}`);

        const defaultTimeFacultyAM = "00:00:00 AM";
        const midnightFacultyAM = new Date(`01/01/2000 ${defaultTimeFacultyAM}`);

        const timeinfacultyAM = startDateFacultyAM > endOfficialTimeFacultyAM ? midnightFacultyAM : startDateFacultyAM < startOfficialTimeFacultyAM ? startOfficialTimeFacultyAM : startDateFacultyAM;
        const timeoutfacultyAM = timeinfacultyAM === midnightFacultyAM ? midnightFacultyAM : endDateFacultyAM;

        // Calculate difference in milliseconds
        const diffMsAM = timeoutfacultyAM - timeinfacultyAM;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyAM = Math.floor(diffMsAM / (1000 * 60 * 60));
        const minutesFacultyAM = Math.floor((diffMsAM % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyAM = Math.floor((diffMsAM % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS RENDERERED TIME
        const formattedFacultyRenderedTimeAM = [String(hoursFacultyAM).padStart(2, "0"), String(minutesFacultyAM).padStart(2, "0"), String(secondsFacultyAM).padStart(2, "0")].join(":");

        //end rendered time

        //  max rendered time

        // Calculate difference in milliseconds MAX RENDERED TIME
        const diffMsAMFacultyAM = endOfficialTimeFacultyAM - startOfficialTimeFacultyAM;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyMRTAM = Math.floor(diffMsAMFacultyAM / (1000 * 60 * 60));
        const minutesFacultyMRTAM = Math.floor((diffMsAMFacultyAM % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyMRTAM = Math.floor((diffMsAMFacultyAM % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedFacultyMaxRenderedTimeAM = [String(hoursFacultyMRTAM).padStart(2, "0"), String(minutesFacultyMRTAM).padStart(2, "0"), String(secondsFacultyMRTAM).padStart(2, "0")].join(":");

        // Calculate difference in milliseconds MAX RENDERED TIME

        const tardFinalformattedFacultyRenderedTimeAM = new Date(`01/01/2000 ${formattedFacultyRenderedTimeAM}`);
        const tardFinalformattedFacultyMaxRenderedTimeAM = new Date(`01/01/2000 ${formattedFacultyMaxRenderedTimeAM}`);

        const finalcalcFacultyAM = tardFinalformattedFacultyMaxRenderedTimeAM - tardFinalformattedFacultyRenderedTimeAM;

        // Convert milliseconds to hours, minutes, seconds
        const hoursfinalcalcFacultyAM = Math.floor(finalcalcFacultyAM / (1000 * 60 * 60));
        const minutesfinalcalcFacultyAM = Math.floor((finalcalcFacultyAM % (1000 * 60 * 60)) / (1000 * 60));
        const secondsfinalcalcFacultyAM = Math.floor((finalcalcFacultyAM % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedfinalcalcFacultyAM = [String(hoursfinalcalcFacultyAM).padStart(2, "0"), String(minutesfinalcalcFacultyAM).padStart(2, "0"), String(secondsfinalcalcFacultyAM).padStart(2, "0")].join(":");

        // // end max rendered time
 


 // END faculty render AM --------------------------------------------------------




 
 // start faculty render PM --------------------------------------------------------

        // rendered time
        // Convert time strings to Date objects
        const startDateFacultyPM = new Date(`01/01/2000 ${officialBreaktimeOUT}`);
        const endDateFacultyPM = new Date(`01/01/2000 ${timeOUT}`);
        const startOfficialTimeFacultyPM = new Date(`01/01/2000 ${officialBreaktimeOUT}`);
        const endOfficialTimeFacultyPM = new Date(`01/01/2000 ${officialTimeOUT}`);

        const defaultTimeFacultyPM = "00:00:00 PM";
        const midnightFacultyPM = new Date(`01/01/2000 ${defaultTimeFacultyPM}`);
        const timeoutfacultyPM =  endDateFacultyPM < startOfficialTimeFacultyPM ? midnightFacultyPM : endDateFacultyPM > endOfficialTimeFacultyPM ? endOfficialTimeFacultyPM : endDateFacultyPM;
        const timeinfacultyPM = timeoutfacultyPM === midnightFacultyPM ? midnightFacultyPM : startDateFacultyPM;
       


        // Calculate difference in milliseconds
        const diffMsPM = timeoutfacultyPM - timeinfacultyPM;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyPM = Math.floor(diffMsPM / (1000 * 60 * 60));
        const minutesFacultyPM = Math.floor((diffMsPM % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyPM = Math.floor((diffMsPM % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS RENDERERED TIME
        const formattedFacultyRenderedTimePM = [String(hoursFacultyPM).padStart(2, "0"), String(minutesFacultyPM).padStart(2, "0"), String(secondsFacultyPM).padStart(2, "0")].join(":");

        //end rendered time

        //  max rendered time

        // Calculate difference in milliseconds MAX RENDERED TIME
        const diffMsPMFacultyPM = endOfficialTimeFacultyPM - startOfficialTimeFacultyPM;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyMRTPM = Math.floor(diffMsPMFacultyPM / (1000 * 60 * 60));
        const minutesFacultyMRTPM = Math.floor((diffMsPMFacultyPM % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyMRTPM = Math.floor((diffMsPMFacultyPM % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedFacultyMaxRenderedTimePM = [String(hoursFacultyMRTPM).padStart(2, "0"), String(minutesFacultyMRTPM).padStart(2, "0"), String(secondsFacultyMRTPM).padStart(2, "0")].join(":");

        // Calculate difference in milliseconds MAX RENDERED TIME

        const tardFinalformattedFacultyRenderedTimePM = new Date(`01/01/2000 ${formattedFacultyRenderedTimePM}`);
        const tardFinalformattedFacultyMaxRenderedTimePM = new Date(`01/01/2000 ${formattedFacultyMaxRenderedTimePM}`);

        const finalcalcFacultyPM = tardFinalformattedFacultyMaxRenderedTimePM - tardFinalformattedFacultyRenderedTimePM;

        // Convert milliseconds to hours, minutes, seconds
        const hoursfinalcalcFacultyPM = Math.floor(finalcalcFacultyPM / (1000 * 60 * 60));
        const minutesfinalcalcFacultyPM = Math.floor((finalcalcFacultyPM % (1000 * 60 * 60)) / (1000 * 60));
        const secondsfinalcalcFacultyPM = Math.floor((finalcalcFacultyPM % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedfinalcalcFacultyPM = [String(hoursfinalcalcFacultyPM).padStart(2, "0"), String(minutesfinalcalcFacultyPM).padStart(2, "0"), String(secondsfinalcalcFacultyPM).padStart(2, "0")].join(":");

        // // end max rendered time
 // END faculty render PM --------------------------------------------------------
















        // HN ------------------------------------------------------------------------------

        // rendered time
        // Convert time strings to Date objects
        const startDateFacultyHN = new Date(`01/01/2000 ${timeIN}`);
        const endDateFacultyHN = new Date(`01/01/2000 ${timeOUT}`);
        const startOfficialTimeFacultyHN = new Date(`01/01/2000 ${officialHonorariumTimeIN}`);
        const endOfficialTimeFacultyHN = new Date(`01/01/2000 ${officialHonorariumTimeOUT}`);

        const defaultTimeFacultyHN = "00:00:00 AM";
        const midnightFacultyHN = new Date(`01/01/2000 ${defaultTimeFacultyHN}`);

        const timeinfacultyHN = endDateFacultyHN < startOfficialTimeFacultyHN ? midnightFacultyHN : startDateFacultyHN > endOfficialTimeFacultyHN ? midnightFacultyHN : startDateFacultyHN < startOfficialTimeFacultyHN ? startOfficialTimeFacultyHN : startDateFacultyHN;
        const timeoutfacultyHN = timeinfacultyHN === midnightFacultyHN ? midnightFacultyHN : endDateFacultyHN < startOfficialTimeFacultyHN ? midnightFacultyHN : endDateFacultyHN < endOfficialTimeFacultyHN ? endDateFacultyHN : endOfficialTimeFacultyHN;

        // Calculate difference in milliseconds
        const diffMsHN = timeoutfacultyHN - timeinfacultyHN;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyHN = Math.floor(diffMsHN / (1000 * 60 * 60));
        const minutesFacultyHN = Math.floor((diffMsHN % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyHN = Math.floor((diffMsHN % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS RENDERERED TIME
        const formattedFacultyRenderedTimeHN = [String(hoursFacultyHN).padStart(2, "0"), String(minutesFacultyHN).padStart(2, "0"), String(secondsFacultyHN).padStart(2, "0")].join(":");

        //end rendered time

        //  max rendered time

        // Calculate difference in milliseconds MAX RENDERED TIME
        const diffMsFacultyHN = endOfficialTimeFacultyHN - startOfficialTimeFacultyHN;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyMRTHN = Math.floor(diffMsFacultyHN / (1000 * 60 * 60));
        const minutesFacultyMRTHN = Math.floor((diffMsFacultyHN % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyMRTHN = Math.floor((diffMsFacultyHN % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedFacultyMaxRenderedTimeHN = [String(hoursFacultyMRTHN).padStart(2, "0"), String(minutesFacultyMRTHN).padStart(2, "0"), String(secondsFacultyMRTHN).padStart(2, "0")].join(":");

        // Calculate difference in milliseconds MAX RENDERED TIME

        const tardFinalformattedFacultyRenderedTimeHN = new Date(`01/01/2000 ${formattedFacultyRenderedTimeHN}`);
        const tardFinalformattedFacultyMaxRenderedTimeHN = new Date(`01/01/2000 ${formattedFacultyMaxRenderedTimeHN}`);

        const finalcalcFacultyHN = tardFinalformattedFacultyMaxRenderedTimeHN - tardFinalformattedFacultyRenderedTimeHN;

        // Convert milliseconds to hours, minutes, seconds
        const hoursfinalcalcFacultyHN = Math.floor(finalcalcFacultyHN / (1000 * 60 * 60));
        const minutesfinalcalcFacultyHN = Math.floor((finalcalcFacultyHN % (1000 * 60 * 60)) / (1000 * 60));
        const secondsfinalcalcFacultyHN = Math.floor((finalcalcFacultyHN % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedfinalcalcFacultyHN = [String(hoursfinalcalcFacultyHN).padStart(2, "0"), String(minutesfinalcalcFacultyHN).padStart(2, "0"), String(secondsfinalcalcFacultyHN).padStart(2, "0")].join(":");

        // // end max rendered time
        //HN END-----------------------------------------------------------------------------

        // SC ------------------------------------------------------------------------------

        // rendered time
        // Convert time strings to Date objects
        const startDateFacultySC = new Date(`01/01/2000 ${timeIN}`);
        const endDateFacultySC = new Date(`01/01/2000 ${timeOUT}`);
        const startOfficialTimeFacultySC = new Date(`01/01/2000 ${officialServiceCreditTimeIN}`);
        const endOfficialTimeFacultySC = new Date(`01/01/2000 ${officialServiceCreditTimeOUT}`);

        const defaultTimeFacultySC = "00:00:00 AM";
        const midnightFacultySC = new Date(`01/01/2000 ${defaultTimeFacultySC}`);

        const timeinfacultySC = endDateFacultySC < startOfficialTimeFacultySC ? midnightFacultySC : startDateFacultySC > endOfficialTimeFacultySC ? midnightFacultySC : startDateFacultySC < startOfficialTimeFacultySC ? startOfficialTimeFacultySC : startDateFacultySC;
        const timeoutfacultySC = timeinfacultySC === midnightFacultySC ? midnightFacultySC : endDateFacultySC < startOfficialTimeFacultySC ? midnightFacultySC : endDateFacultySC < endOfficialTimeFacultySC ? endDateFacultySC : endOfficialTimeFacultySC;

        // Calculate difference in milliseconds
        const diffMsSC = timeoutfacultySC - timeinfacultySC;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultySC = Math.floor(diffMsSC / (1000 * 60 * 60));
        const minutesFacultySC = Math.floor((diffMsSC % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultySC = Math.floor((diffMsSC % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS RENDERERED TIME
        const formattedFacultyRenderedTimeSC = [String(hoursFacultySC).padStart(2, "0"), String(minutesFacultySC).padStart(2, "0"), String(secondsFacultySC).padStart(2, "0")].join(":");

        //end rendered time

        //  max rendered time

        // Calculate difference in milliseconds MAX RENDERED TIME
        const diffMsFacultySC = endOfficialTimeFacultySC - startOfficialTimeFacultySC;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyMRTSC = Math.floor(diffMsFacultySC / (1000 * 60 * 60));
        const minutesFacultyMRTSC = Math.floor((diffMsFacultySC % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyMRTSC = Math.floor((diffMsFacultySC % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedFacultyMaxRenderedTimeSC = [String(hoursFacultyMRTSC).padStart(2, "0"), String(minutesFacultyMRTSC).padStart(2, "0"), String(secondsFacultyMRTSC).padStart(2, "0")].join(":");

        // Calculate difference in milliseconds MAX RENDERED TIME

        const tardFinalformattedFacultyRenderedTimeSC = new Date(`01/01/2000 ${formattedFacultyRenderedTimeSC}`);
        const tardFinalformattedFacultyMaxRenderedTimeSC = new Date(`01/01/2000 ${formattedFacultyMaxRenderedTimeSC}`);

        const finalcalcFacultySC = tardFinalformattedFacultyMaxRenderedTimeSC - tardFinalformattedFacultyRenderedTimeSC;

        // Convert milliseconds to hours, minutes, seconds
        const hoursfinalcalcFacultySC = Math.floor(finalcalcFacultySC / (1000 * 60 * 60));
        const minutesfinalcalcFacultySC = Math.floor((finalcalcFacultySC % (1000 * 60 * 60)) / (1000 * 60));
        const secondsfinalcalcFacultySC = Math.floor((finalcalcFacultySC % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedfinalcalcFacultySC = [String(hoursfinalcalcFacultySC).padStart(2, "0"), String(minutesfinalcalcFacultySC).padStart(2, "0"), String(secondsfinalcalcFacultySC).padStart(2, "0")].join(":");

        // // end max rendered time
        //SC END-----------------------------------------------------------------------------

        // OT ------------------------------------------------------------------------------

        // rendered time
        // Convert time strings to Date objects
        const startDateFacultyOT = new Date(`01/01/2000 ${timeIN}`);
        const endDateFacultyOT = new Date(`01/01/2000 ${timeOUT}`);
        const startOfficialTimeFacultyOT = new Date(`01/01/2000 ${officialOverTimeIN}`);
        const endOfficialTimeFacultyOT = new Date(`01/01/2000 ${officialOverTimeOUT}`);

        const defaultTimeFacultyOT = "00:00:00 AM";
        const midnightFacultyOT = new Date(`01/01/2000 ${defaultTimeFacultyOT}`);

        const timeinfacultyOT = endDateFacultyOT < startOfficialTimeFacultyOT ? midnightFacultyOT : startDateFacultyOT > endOfficialTimeFacultyOT ? midnightFacultyOT : startDateFacultyOT < startOfficialTimeFacultyOT ? startOfficialTimeFacultyOT : startDateFacultyOT;
        const timeoutfacultyOT = timeinfacultyOT === midnightFacultyOT ? midnightFacultyOT : endDateFacultyOT < startOfficialTimeFacultyOT ? midnightFacultyOT : endDateFacultyOT < endOfficialTimeFacultyOT ? endDateFacultyOT : endOfficialTimeFacultyOT;

        // Calculate difference in milliseconds
        const diffMsOT = timeoutfacultyOT - timeinfacultyOT;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyOT = Math.floor(diffMsOT / (1000 * 60 * 60));
        const minutesFacultyOT = Math.floor((diffMsOT % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyOT = Math.floor((diffMsOT % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS RENDERERED TIME
        const formattedFacultyRenderedTimeOT = [String(hoursFacultyOT).padStart(2, "0"), String(minutesFacultyOT).padStart(2, "0"), String(secondsFacultyOT).padStart(2, "0")].join(":");

        //end rendered time

        //  max rendered time

        // Calculate difference in milliseconds MAX RENDERED TIME
        const diffMsFacultyOT = endOfficialTimeFacultyOT - startOfficialTimeFacultyOT;

        // Convert milliseconds to hours, minutes, seconds
        const hoursFacultyMRTOT = Math.floor(diffMsFacultyOT / (1000 * 60 * 60));
        const minutesFacultyMRTOT = Math.floor((diffMsFacultyOT % (1000 * 60 * 60)) / (1000 * 60));
        const secondsFacultyMRTOT = Math.floor((diffMsFacultyOT % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedFacultyMaxRenderedTimeOT = [String(hoursFacultyMRTOT).padStart(2, "0"), String(minutesFacultyMRTOT).padStart(2, "0"), String(secondsFacultyMRTOT).padStart(2, "0")].join(":");

        // Calculate difference in milliseconds MAX RENDERED TIME

        const tardFinalformattedFacultyRenderedTimeOT = new Date(`01/01/2000 ${formattedFacultyRenderedTimeOT}`);
        const tardFinalformattedFacultyMaxRenderedTimeOT = new Date(`01/01/2000 ${formattedFacultyMaxRenderedTimeOT}`);

        const finalcalcFacultyOT = tardFinalformattedFacultyMaxRenderedTimeOT - tardFinalformattedFacultyRenderedTimeOT;

        // Convert milliseconds to hours, minutes, seconds
        const hoursfinalcalcFacultyOT = Math.floor(finalcalcFacultyOT / (1000 * 60 * 60));
        const minutesfinalcalcFacultyOT = Math.floor((finalcalcFacultyOT % (1000 * 60 * 60)) / (1000 * 60));
        const secondsfinalcalcFacultyOT = Math.floor((finalcalcFacultyOT % (1000 * 60)) / 1000);

        // Format output as HH:MM:SS
        const formattedfinalcalcFacultyOT = [String(hoursfinalcalcFacultyOT).padStart(2, "0"), String(minutesfinalcalcFacultyOT).padStart(2, "0"), String(secondsfinalcalcFacultyOT).padStart(2, "0")].join(":");

        // // end max rendered time
        //OT END-----------------------------------------------------------------------------

        return {
          ...row,
          HonorariumTimeIN,
          HonorariumTimeOUT,
          ServiceCreditTimeIN,
          ServiceCreditTimeOUT,
          OverTimeIN,
          OverTimeOUT,
          officialTimeIN,
          officialTimeOUT,
          officialHonorariumTimeIN,
          officialHonorariumTimeOUT,
          officialServiceCreditTimeIN,
          officialServiceCreditTimeOUT,
          officialOverTimeIN,
          officialOverTimeOUT,
          OfficialTimeMorning,
          OfficialTimeAfternoon,

          timeIN,
          timeOUT,
          OfficialBreakAM,
          OfficialBreakPM,
          breaktimeIN,
          breaktimeOUT,

          // midnightFaculty,
          // finalcalcFaculty,

          // formattedfinalcalcFaculty,
          // formattedFacultyRenderedTime,
          formattedfinalcalcFacultyAM,
          formattedFacultyMaxRenderedTimeAM,
          finalcalcFacultyAM,
          formattedFacultyRenderedTimeAM,

          formattedFacultyRenderedTimePM,
          formattedfinalcalcFacultyPM,
          formattedFacultyMaxRenderedTimePM,
          finalcalcFacultyPM,

          // formattedFacultyMaxRenderedTime,

          formattedfinalcalcFacultyHN,
          formattedFacultyRenderedTimeHN,

          formattedFacultyMaxRenderedTimeHN,

          formattedfinalcalcFacultySC,
          formattedFacultyRenderedTimeSC,

          formattedFacultyMaxRenderedTimeSC,

          formattedfinalcalcFacultyOT,
          formattedFacultyRenderedTimeOT,

          formattedFacultyMaxRenderedTimeOT,
        };
      });

      setAttendanceData(processedData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const saveOverallAttendance = async () => {
    console.log("Employee Number:", employeeNumber);
    const record = {
      employeeNumber,
      startDate,
      endDate,
      totalRenderedTimeMorning: calculateTotalRenderedTime(), // Ensure this function exists
    };


    try {
      const response = await axios.post("http://localhost:5000/attendance/api/overall_attendance", record);
      alert(response.data.message || "Attendance record saved successfully!");
    } catch (error) {
      console.error("Error saving overall attendance:", error);
      alert("Failed to save attendance record.");
    }
  };
  
  // // TIME IN AND TIME OUT AM
  // const calculateTotalRenderedTime = () => {
  //   if (!attendanceData || attendanceData.length === 0) {
  //     return "00:00:00"; // Handle empty data gracefully
  //   }

  //   let totalSeconds = 0;

  //   attendanceData.forEach((row) => {
  //     const facultyRenderedTime = !row.officialTimeIN || !row.timeOUT || row.formattedFacultyRenderedTime === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTime;

  //     const [hours, minutes, seconds] = facultyRenderedTime.split(":").map(Number);
  //     totalSeconds += hours * 3600 + minutes * 60 + seconds;
  //   });

  //   const totalHours = Math.floor(totalSeconds / 3600);
  //   const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  //   const totalSecs = totalSeconds % 60;

  //   //const OverAll = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;

  //   // return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;

  //    // Return computed time
  //    const overallTime = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
  //    return overallTime;
  // };

  // const calculateTotalRenderedTimeTardiness = () => {
  //   let totalSeconds = 0;

  //   attendanceData.forEach((row) => {
  //     const facultyRenderedTimeTardiness = !row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFaculty === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTime : row.formattedfinalcalcFaculty;

  //     const [hours, minutes, seconds] = facultyRenderedTimeTardiness.split(":").map(Number);
  //     totalSeconds += hours * 3600 + minutes * 60 + seconds;
  //   });

  //   const totalHours = Math.floor(totalSeconds / 3600);
  //   const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  //   const totalSecs = totalSeconds % 60;

  //   return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
  // };
  // // TIME IN AND TIME OUT END AM


// //------------------------------------------
 // TIME IN AND TIME OUT AM--------------------------------------------------------------------------------------
 const calculateTotalRenderedTimeAM = () => {
  if (!attendanceData || attendanceData.length === 0) {
    return "00:00:00"; // Handle empty data gracefully
  }

  let totalSeconds = 0;

  attendanceData.forEach((row) => {
    const facultyRenderedTimeAM = !row.officialTimeIN || !row.breaktimeIN || row.formattedFacultyRenderedTimeAM === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeAM;

    const [hours, minutes, seconds] = facultyRenderedTimeAM.split(":").map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecs = totalSeconds % 60;

  //const OverAll = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;

  // return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;

   // Return computed time
   const overallTimeAM = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
   return overallTimeAM;
};

const calculateTotalRenderedTimeTardinessAM = () => {
  let totalSeconds = 0;

  attendanceData.forEach((row) => {
    const facultyRenderedTimeTardinessAM = !row.officialTimeIN || !row.breaktimeIN || row.formattedfinalcalcFacultyAM === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeAM : row.formattedfinalcalcFacultyAM;

    const [hours, minutes, seconds] = facultyRenderedTimeTardinessAM.split(":").map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecs = totalSeconds % 60;

  return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
};
// TIME IN AND TIME OUT END AM --------------------------------------------------------------------------------------



// TIME IN AND TIME OUT PM --------------------------------------------------------------------------------------
const calculateTotalRenderedTimePM = () => {
  if (!attendanceData || attendanceData.length === 0) {
    return "00:00:00"; // Handle empty data gracefully
  }

  let totalSeconds = 0;

  attendanceData.forEach((row) => {
    const facultyRenderedTimePM = !row.officialBreaktimeOUT || !row.timeOUT || row.formattedFacultyRenderedTimePM === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimePM;

    const [hours, minutes, seconds] = facultyRenderedTimePM.split(":").map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecs = totalSeconds % 60;

  //const OverAll = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;

  // return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;

   // Return computed time
   const overallTimePM = `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
   return overallTimePM;
};

const calculateTotalRenderedTimeTardinessPM = () => {
  let totalSeconds = 0;

  attendanceData.forEach((row) => {
    const facultyRenderedTimeTardinessPM = !row.officialBreaktimeOUT || !row.timeOUT || row.formattedfinalcalcFacultyPM === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimePM : row.formattedfinalcalcFacultyPM;

    const [hours, minutes, seconds] = facultyRenderedTimeTardinessPM.split(":").map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  });

  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecs = totalSeconds % 60;

  return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
};
// TIME IN AND TIME OUT END PM --------------------------------------------------------------------------------------


// //--------------------------------------------











   // TIME IN AND TIME OUT HONORARUIM
   const calculateTotalRenderedTimeHN = () => {
    let totalSeconds = 0;

    attendanceData.forEach((row) => {
      const facultyRenderedTimeHN = !row.officialTimeIN || !row.timeOUT || row.formattedFacultyRenderedTimeHN === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeHN;

      const [hours, minutes, seconds] = facultyRenderedTimeHN.split(":").map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalSecs = totalSeconds % 60;

    return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
  };

  const calculateTotalRenderedTimeTardinessHN = () => {
    let totalSeconds = 0;

    attendanceData.forEach((row) => {
      const facultyRenderedTimeTardinessHN = !row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFacultyHN === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeHN : row.formattedfinalcalcFacultyHN;

      const [hours, minutes, seconds] = facultyRenderedTimeTardinessHN.split(":").map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalSecs = totalSeconds % 60;

    return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
  };
  // TIME IN AND TIME OUT END HONORARIUM

   // TIME IN AND TIME OUT ServiceCredit
   const calculateTotalRenderedTimeSC = () => {
    let totalSeconds = 0;

    attendanceData.forEach((row) => {
      const facultyRenderedTimeSC = !row.officialTimeIN || !row.timeOUT || row.formattedFacultyRenderedTimeSC === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeSC;

      const [hours, minutes, seconds] = facultyRenderedTimeSC.split(":").map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalSecs = totalSeconds % 60;

    return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
  };

  const calculateTotalRenderedTimeTardinessSC = () => {
    let totalSeconds = 0;

    attendanceData.forEach((row) => {
      const facultyRenderedTimeTardinessSC = !row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFacultySC === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeSC : row.formattedfinalcalcFacultySC;

      const [hours, minutes, seconds] = facultyRenderedTimeTardinessSC.split(":").map(Number);
      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalSecs = totalSeconds % 60;

    return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
  };
  // TIME IN AND TIME OUT END Service Credit

     // TIME IN AND TIME OUT OverTime
     const calculateTotalRenderedTimeOT = () => {
      let totalSeconds = 0;
  
      attendanceData.forEach((row) => {
        const facultyRenderedTimeOT = !row.officialTimeIN || !row.timeOUT || row.formattedFacultyRenderedTimeOT === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeOT;
  
        const [hours, minutes, seconds] = facultyRenderedTimeOT.split(":").map(Number);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
      });
  
      const totalHours = Math.floor(totalSeconds / 3600);
      const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
      const totalSecs = totalSeconds % 60;
  
      return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
    };
  
    const calculateTotalRenderedTimeTardinessOT = () => {
      let totalSeconds = 0;
  
      attendanceData.forEach((row) => {
        const facultyRenderedTimeTardinessOT = !row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFacultyOT === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeOT : row.formattedfinalcalcFacultyOT;
  
        const [hours, minutes, seconds] = facultyRenderedTimeTardinessOT.split(":").map(Number);
        totalSeconds += hours * 3600 + minutes * 60 + seconds;
      });
  
      const totalHours = Math.floor(totalSeconds / 3600);
      const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
      const totalSecs = totalSeconds % 60;
  
      return `${String(totalHours).padStart(2, "0")}:${String(totalMinutes).padStart(2, "0")}:${String(totalSecs).padStart(2, "0")}`;
    };
    // TIME IN AND TIME OUT END OverTime

  return (
    <Container
      maxWidth={false} // Disable the default maxWidth
      sx={{
        maxWidth: "4500px", // Set your custom width
        margin: "0 auto", // Center the container
        padding: "0px", // Optional padding
      }}
    >
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Attendance Report
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="Employee Number"
              variant="outlined"
              fullWidth
              value={employeeNumber}
              onChange={(e) => setEmployeeNumber(e.target.value)}
              required
              sx={{ width: "250px", marginLeft: "10px" }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />

            <TextField
              label="Start Date"
              type="date"
              variant="outlined"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
              sx={{ width: "250px", marginLeft: "10px" }}
            />

            <TextField
              label="End Date"
              type="date"
              variant="outlined"
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
              sx={{ width: "250px", marginLeft: "10px" }}
            />
            <Button sx={{ width: "200px", height: "55px", marginLeft: "10px" }} type="submit" variant="contained" color="primary" fullWidth>
              Generate Report
            </Button>
          </Box>
        </form>

        {attendanceData.length > 0 && (
          <TableContainer component={Paper} sx={{ mt: 4 }} style={{ marginBottom: "5%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      width: "150px",
                      maxWidth: "150px",
                      minWidth: "150px",
                      textAlign: "center", // Optional: ensures text alignment remains consistent
                      overflow: "hidden", // Optional: handle overflow
                      textOverflow: "ellipsis", // Optional: adds ellipsis for overflowing text
                      whiteSpace: "nowrap", // Optional: prevents text wrapping
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      maxWidth: "150px",
                      minWidth: "120px",
                      textAlign: "center", // Optional: ensures text alignment remains consistent
                      overflow: "hidden", // Optional: handle overflow
                      textOverflow: "ellipsis", // Optional: adds ellipsis for overflowing text
                      whiteSpace: "nowrap",
                    }}
                  >
                    Day
                  </TableCell>
                  <TableCell
                                      sx={{
                                        width: "150px",
                                        maxWidth: "150px",
                                        minWidth: "120px",
                                        textAlign: "center", // Optional: ensures text alignment remains consistent
                                        overflow: "hidden", // Optional: handle overflow
                                        textOverflow: "ellipsis", // Optional: adds ellipsis for overflowing text
                                        whiteSpace: "nowrap", // Optional: prevents text wrapping
                                      }}
                                    >
                                      Time IN
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#edfba6",
                                        fontWeight: "bold",
                                        width: "100px",
                                        maxWidth: "150px",
                                        minWidth: "120px",
                                        textAlign: "center", // Optional: ensures text alignment remains consistent
                                        overflow: "hidden", // Optional: handle overflow
                                        textOverflow: "ellipsis", // Optional: adds ellipsis for overflowing text
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      Official Time IN
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        width: "150px",
                                        maxWidth: "150px",
                                        minWidth: "120px",
                                        textAlign: "center", // Optional: ensures text alignment remains consistent
                                        overflow: "hidden", // Optional: handle overflow
                                        textOverflow: "ellipsis", // Optional: adds ellipsis for overflowing text
                                        whiteSpace: "nowrap", // Optional: prevents text wrapping
                                      }}
                                    >
                                      Breaktime IN
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#edfba6",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Official Breaktime IN
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#bafac6",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Official Time (MORNING) Rendered Time
                                    </TableCell>
                  
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#ffd2d2",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Tardiness (MORNING)
                                    </TableCell>
                  
                                    <TableCell>Breaktime OUT</TableCell>
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#edfba6",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Official Breaktime OUT
                                    </TableCell>
                                    <TableCell>Time OUT</TableCell>
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#edfba6",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Official Time OUT
                                    </TableCell>
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#bafac6",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Official Time (AFTERNOON) Rendered Time
                                    </TableCell>
                  
                                    <TableCell
                                      sx={{
                                        backgroundColor: "#ffd2d2",
                                        fontWeight: "bold",
                                        width: "100px",
                                        textAlign: "center",
                                      }}
                                    >
                                      TARDINESS (AFTERNOON)
                                    </TableCell>

                  <TableCell>Honorarium Time IN</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    OFFICIAL Honorarium Time IN
                  </TableCell>
                  <TableCell>Honorarium Time OUT</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    OFFICIAL Honorarium Time OUT
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#bafac6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Honorarium Rendered Time
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#ffd2d2",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    TARDINESS (HONORARIUM)
                  </TableCell>

                  <TableCell>Service Credit Time IN</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    OFFICIAL Service Credit Time IN
                  </TableCell>
                  <TableCell>Service Credit Time OUT</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    OFFICIAL Service Credit Time OUT
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#bafac6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Service Credit Rendered Time
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#ffd2d2",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    TARDINESS (SERVICE CREDIT)
                  </TableCell>

                  <TableCell>Overtime Time IN</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    OFFICIAL Overtime Time IN
                  </TableCell>
                  <TableCell>Overtime Time OUT</TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#edfba6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    OFFICIAL Overtime Time OUT
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#bafac6",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    Overtime Rendered Time
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#ffd2d2",
                      fontWeight: "bold",
                      width: "100px",
                      textAlign: "center",
                    }}
                  >
                    TARDINESS (OVERTIME)
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell
                      sx={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                        textAlign: "center",
                      }}
                    >
                      {row.date}
                    </TableCell>
                    
                    
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "100px",
                        maxWidth: "150px",
                        minWidth: "120px",
                        textAlign: "center", // Optional: ensures text alignment remains consistent
                        overflow: "hidden", // Optional: handle overflow
                        textOverflow: "ellipsis", // Optional: adds ellipsis for overflowing text
                        whiteSpace: "nowrap",
                      }}
                    >
                      {row.day}
                    </TableCell>

  {/*    ----------------------AM AM AM AM AM AM AM STARTS STARTS STARTS STARTS STARTS STARTS  ------------------------------*/}

                    <TableCell>{row.timeIN}</TableCell>
                    
                    
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "120px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialTimeIN}
                    </TableCell>


                    <TableCell>{row.breaktimeIN}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "120px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialBreaktimeIN}
                      
                    </TableCell>



                    <TableCell
                      sx={{
                        backgroundColor: "#bafac6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                     
                      {!row.officialTimeIN || !row.officialBreaktimeIN || row.formattedFacultyRenderedTimeAM === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeAM}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#ffd2d2",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    > 
                      {!row.officialTimeIN || !row.breaktimeIN || row.formattedfinalcalcFacultyAM === "NaN:NaN:NaN" ? row.formattedfinalcalcFacultyAM : row.formattedfinalcalcFacultyAM}
                    </TableCell>

  {/*    ----------------------AM AM AM AM AM AM AM ENDS ENDS ENDS ENDS ENDS ENDS  ------------------------------*/}



  {/*    ----------------------PM PM PM PM PM PM PM STARTS STARTS STARTS STARTS STARTS STARTS  ------------------------------*/}

  <TableCell>{row.breaktimeOUT}</TableCell>
                    
                    
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "120px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialBreaktimeOUT}
                    </TableCell>


                    <TableCell>{row.timeOUT}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "120px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialTimeOUT}
                    </TableCell>



                    <TableCell
                      sx={{
                        backgroundColor: "#bafac6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialBreaktimeOUT || !row.timeOUT || row.formattedFacultyRenderedTimePM === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimePM}
                    </TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#ffd2d2",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialBreaktimeOUT || !row.timeOUT || row.formattedfinalcalcFacultyPM === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimePM : row.formattedfinalcalcFacultyPM}
                    </TableCell>

  {/*    ----------------------PM PM PM PM PM PM PM ENDS ENDS ENDS ENDS ENDS ENDS  ------------------------------*/}










                    

                    <TableCell>{row.officialHonorariumTimeIN === "00:00:00 AM" ? "N/A" : row.timeIN}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialHonorariumTimeIN === "00:00:00 AM" ? "N/A" : row.officialHonorariumTimeIN}
                    </TableCell>
                    <TableCell>{row.officialHonorariumTimeOUT === "00:00:00 AM" ? "N/A" : row.timeOUT}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialHonorariumTimeOUT === "00:00:00 AM" ? "N/A" : row.officialHonorariumTimeOUT}
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: "#bafac6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialTimeIN || !row.timeOUT || row.formattedFacultyRenderedTimeHN === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeHN}
                    </TableCell>
                    {/*    ----------------------HN  ------------------------------*/}
                    <TableCell
                      sx={{
                        backgroundColor: "#ffd2d2",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFacultyHN === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeHN : row.formattedfinalcalcFacultyHN}
                    </TableCell>
                    {/*    ----------------------HN  ------------------------------*/}

                    <TableCell>{row.officialServiceCreditTimeIN === "00:00:00 AM" ? "N/A" : row.timeIN}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialServiceCreditTimeIN === "00:00:00 AM" ? "N/A" : row.officialServiceCreditTimeIN}
                    </TableCell>
                    <TableCell>{row.officialServiceCreditTimeOUT === "00:00:00 AM" ? "N/A" : row.timeOUT}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialServiceCreditTimeOUT === "00:00:00 AM" ? "N/A" : row.officialServiceCreditTimeOUT}
                    </TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: "#bafac6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialTimeSC || !row.timeOUT || row.formattedFacultyRenderedTimeSC === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeSC}
                    </TableCell>
                    {/*    ----------------------SC  ------------------------------*/}
                    <TableCell
                      sx={{
                        backgroundColor: "#ffd2d2",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFacultySC === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeSC : row.formattedfinalcalcFacultySC}
                    </TableCell>
                    {/*    ----------------------SC  ------------------------------*/}

                    <TableCell>{row.officialOverTimeIN === "00:00:00 AM" ? "N/A" : row.timeIN}</TableCell>
                    <TableCell
                      sx={{
                        backgroundColor: "#edfba6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {row.officialOverTimeIN === "00:00:00 AM" ? "N/A" : row.officialOverTimeIN}
                    </TableCell>
                    <TableCell>{row.officialOverTimeOUT === "00:00:00 AM" ? "N/A" : row.timeOUT}</TableCell>
                    <TableCell sx={{ backgroundColor: "#edfba6", fontWeight: "bold", width: "100px", textAlign: "center" }}>{row.officialOverTimeOUT === "00:00:00 AM" ? "N/A" : row.officialOverTimeOUT}</TableCell>

                    <TableCell
                      sx={{
                        backgroundColor: "#bafac6",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialTimeIN || !row.timeOUT || row.formattedFacultyRenderedTimeOT === "NaN:NaN:NaN" ? "00:00:00" : row.formattedFacultyRenderedTimeOT}
                    </TableCell>

                    {/*    ----------------------OT  ------------------------------*/}
                    <TableCell
                      sx={{
                        backgroundColor: "#ffd2d2",
                        fontWeight: "bold",
                        width: "100px",
                        textAlign: "center",
                      }}
                    >
                      {!row.officialTimeIN || !row.timeOUT || row.formattedfinalcalcFacultyOT === "NaN:NaN:NaN" ? row.formattedFacultyMaxRenderedTimeOT : row.formattedfinalcalcFacultyOT}
                    </TableCell>
                    {/*    ----------------------OT  ------------------------------*/}
                  </TableRow>
                ))}
                <TableRow>


                  {/*    ----------------------AM  ------------------------------*/}
                  <TableCell colSpan={5} sx={{ fontWeight: "bold", textAlign: "right" }}>
                    Total Rendered Time (Morning):
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#bafac6",
                    }}
                  >
                    {calculateTotalRenderedTimeAM()}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#ffd2d2",
                    }}
                  >
                    {calculateTotalRenderedTimeTardinessAM()}
                  </TableCell>
{/*    ----------------------AM  ------------------------------*/}






{/*    ----------------------PM  ------------------------------*/}


<TableCell colSpan={3} sx={{ fontWeight: "bold", textAlign: "right" }}>
                    Total Rendered Time (Afternoon):
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#bafac6",
                    }}
                  >
                    {calculateTotalRenderedTimePM()}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#ffd2d2",
                    }}
                  >
                    {calculateTotalRenderedTimeTardinessPM()}
                  </TableCell>


{/*    ----------------------PM  ------------------------------*/}



                  <TableCell colSpan={3} sx={{ fontWeight: "bold", textAlign: "right" }}>
                    Total Rendered Time (Honorarium):
                  </TableCell>
                  <TableCell colSpan={2} sx={{ fontWeight: "bold", textAlign: "center", backgroundColor: "#bafac6" }}>
                    {calculateTotalRenderedTimeHN()}
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#ffd2d2",
                    }}
                  >
                                        {calculateTotalRenderedTimeTardinessHN()}

                  </TableCell>
                  <TableCell colSpan={3} sx={{ fontWeight: "bold", textAlign: "right" }}>
                    Total Rendered Time (Service Credit):
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#bafac6",
                    }}
                  >
                    {calculateTotalRenderedTimeSC()}
                    
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#ffd2d2",
                    }}
                  >
                                        {calculateTotalRenderedTimeTardinessSC()}
                    
                  </TableCell>

                  <TableCell colSpan={3} sx={{ fontWeight: "bold", textAlign: "right" }}>
                    Total Rendered Time (Overtime):
                  </TableCell>
                  <TableCell
                    colSpan={2}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#bafac6",
                    }}
                  >
                    {calculateTotalRenderedTimeOT()}
                    
                  </TableCell>
                  <TableCell
                    colSpan={1}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      backgroundColor: "#ffd2d2",
                    }}
                  >
                                        {calculateTotalRenderedTimeTardinessOT()}
                    
                  </TableCell>
                  
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} sx={{ fontWeight: "bold", textAlign: "right" }}>
                    Overall Rendered Time {startDate} to {endDate}:
                  </TableCell>
                  <TableCell
                    colSpan={5}
                    sx={{
                      fontWeight: "bold",
                      textAlign: "left",
                      backgroundColor: "#ADD8E6",
                    }}
                  >
                   HELLO WORD
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Button
          sx={{
            width: "200px",
            height: "55px",
            marginleft: "10px",
            margintopt: "10px",
          }}
          variant="contained"
          color="primary"
          onClick={saveOverallAttendance}
          fullWidth
        >
          Saved Record
        </Button>
      </Box>
    </Container>
  );
};

export default AttendanceModuleFaculty;
