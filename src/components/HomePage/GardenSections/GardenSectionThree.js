import styles from '../../styles/HomePage/GardenSectionThree.module.css';
import LargePlotElement from '../Plots/LargePlotElement';
import MediumPlotElementHorizontal from '../Plots/MediumPlotElementHorizontal';
import MediumPlotElement from '../Plots/MediumPlotElementVertical';
import CircleBlocker from '../Plots/CircleBlocker';

export default function GardenSectionThree(props) {

  const plantedPlantsArraySectionOne = props.plants;
  // console.log('test', plantedPlantsArraySectionOne);
  // console.log('test2', props.plantInfo)
  
  const plot1Plants = [];
  const plot2Plants = [];
  const plot3Plants = [];
  const plot4Plants = [];
  const plot5Plants = [];
  const plot6Plants = [];
  const plot29Plants = [];
  const plot30Plants = [];
  const plot31Plants = [];
  const plot32Plants = [];
  const plot33Plants = [];
  const plot34Plants = [];

  for (let plantObject in plantedPlantsArraySectionOne) {
    for (let plantInfoObject in props.plantInfo) {
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 1 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot1Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 2 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot2Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 3 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot3Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 4 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot4Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 5 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot5Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 6 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot6Plants.push(props.plantInfo[plantInfoObject].photo_url);
        console.log('plot6', plot6Plants);
        console.log('plot6.2', props.plantInfo[plantInfoObject]);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 29 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot29Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 30 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot30Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 31 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot31Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 32 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot32Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 33 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot33Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
      if (
        plantedPlantsArraySectionOne[plantObject].plot_id === 34 &&
        plantedPlantsArraySectionOne[plantObject].plant_id ===
          props.plantInfo[plantInfoObject].plant_id
      ) {
        plot34Plants.push(props.plantInfo[plantInfoObject].photo_url);
      }
    }
    // console.log(plot43);
    // console.log(plot43Plants);
  }
  return (
    <div className={styles.section3Container}>
      <div className={styles.sec3Column}>
        <div className={styles.sec3row}>
          <LargePlotElement icons={plot6Plants}/>
          <LargePlotElement icons={plot3Plants}/>
          <MediumPlotElementHorizontal icons={plot29Plants}/>

        </div>
      </div>
      <div className={styles.sec3Column}>
        <div className={styles.sec3row}>
          <LargePlotElement icons={plot5Plants}/>
          <LargePlotElement icons={plot2Plants}/>
          <MediumPlotElementHorizontal icons={plot30Plants}/>

        </div>
      </div>
      <div className={styles.sec3Column}>
        <div className={styles.sec3row}>
          <LargePlotElement icons={plot4Plants}/>
          <LargePlotElement icons={plot1Plants}/>
          <MediumPlotElementHorizontal icons={plot31Plants}/>


        </div>
      </div>
      <div className={styles.sec3Column}>
        <div className={styles.sec3row4}>
          <MediumPlotElement icons={plot34Plants}/>
          <CircleBlocker />
          {/* <MediumPlotElement /> */}
          <CircleBlocker />
          {/* <MediumPlotElement /> */}
          <CircleBlocker />
        </div>
      </div>
    </div>
  );
}