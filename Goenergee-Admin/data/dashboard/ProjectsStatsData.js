import {
	Briefcase,
    ListTask,
    People,
    Bullseye
} from 'react-bootstrap-icons';

export const ProjectsStats = [
    {
       id:1,
       title : "Initiated",
       value : 1,
       icon: <Briefcase size={18}/>,
       
    },
    {
        id:2,
        title : "Failed",
        value : 132,
        icon: <ListTask size={18}/>,
       
     },
     {
        id:3,
        title : "Completed",
        value : 12,
        icon: <People size={18}/>,
      //   statInfo: '<span className="text-dark me-2">1</span> Completed' 
     },
     {
        id:4,
        title : "Wallet Balance",
        value : '76',
        icon: <Bullseye size={18}/>,
      //   statInfo: '<span className="text-dark me-2">5%</span> Completed' 
     }
];
export default ProjectsStats;
