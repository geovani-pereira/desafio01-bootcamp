const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let contagem  = 0;


function checkId(req,res,next){
  const { id } = req.params;
  const project = projects.find(p => p.id == id);
  if(!project){
    return res.status(400).json({erro: 'Task not found'})
  }
  req.id = project.id;

  return next();
}
server.use('/projects', (req,res,next)=>{
  contagem++;
  console.log(contagem);

  return next();
});

server.post('/projects', (req,res)=>{
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks:{
      title
    }
  };

  projects.push(project);

  return res.json(project);

});

server.get('/projects', (req,res) =>{
  return res.json(projects);
});

server.put('/projects/:id', (req,res)=>{
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
})
server.post('/projects/:id/tasks',checkId,(req,res)=>{
  const { id } = req.params;
  const  { title } = req.body;
  const project = projects.find(p => p.id ==id);
  project.tasks.title = title;
  return res.json(project);
});

server.delete('/projects/:id', (req,res) =>{
  const { id } = req.params;
  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.send("ok");

});

server.listen(3000);