import { ArrowLeft, Edit, Mail, Phone, MapPin, Calendar, Award, Wrench, TrendingUp, Clock } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Badge } from './components/ui/badge';
import { Progress } from './components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';
import { StatusBadge } from './widgets/StatusBadge';
import { mockEmployees } from './mockEmployees';

interface EmployeeDetailPageProps {
  employeeId: string;
  onBack: () => void;
}

export function EmployeeDetailPage({ employeeId, onBack }: EmployeeDetailPageProps) {
  const employee = mockEmployees.find(e => e.id === employeeId);
  
  if (!employee) {
    return (
      <div className="p-8">
        <p>Employee not found</p>
        <Button onClick={onBack} variant="outline" className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
      </div>
    );
  }

  const getSkillColor = (level: string) => {
    switch (level) {
      case 'expert': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'advanced': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'intermediate': return 'bg-green-100 text-green-700 border-green-200';
      case 'beginner': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl">
            {employee.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1>{employee.name}</h1>
            <p className="text-gray-500">{employee.position} • {employee.department}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button size="sm">
            Schedule Training
          </Button>
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600">Email</p>
          </div>
          <p className="text-sm">{employee.email}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Phone className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600">Phone</p>
          </div>
          <p className="text-sm">{employee.phone}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600">Join Date</p>
          </div>
          <p className="text-sm">{employee.joinDate}</p>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-4 h-4 text-gray-400" />
            <p className="text-sm text-gray-600">Status</p>
          </div>
          <StatusBadge status={employee.status} />
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills & Certificates</TabsTrigger>
          <TabsTrigger value="machines">Assigned Machines</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Personal Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Employee Number</p>
                  <p className="font-mono text-sm">{employee.employeeNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date of Birth</p>
                  <p>{employee.dateOfBirth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p>{employee.address}, {employee.city}, {employee.country}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Emergency Contact</p>
                  <p>{employee.emergencyContact.name} ({employee.emergencyContact.relationship})</p>
                  <p className="text-sm text-gray-500">{employee.emergencyContact.phone}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Professional Summary</h3>
              <p className="text-sm text-gray-700 mb-4">{employee.bio.summary}</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="text-sm">{employee.bio.experience} years</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Education</p>
                  <p className="text-sm">{employee.bio.education}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Previous Companies</p>
                  <div className="flex flex-wrap gap-2">
                    {employee.bio.previousCompanies.map((company, idx) => (
                      <Badge key={idx} variant="outline">{company}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Skills & Certificates Tab */}
        <TabsContent value="skills" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Skills</h3>
            <div className="space-y-4">
              {employee.skills.map((skill, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span>{skill.name}</span>
                      <Badge variant="outline" className={getSkillColor(skill.level)}>
                        {skill.level}
                      </Badge>
                    </div>
                    <span className="text-sm text-gray-500">{skill.yearsOfExperience} years</span>
                  </div>
                  <Progress 
                    value={skill.level === 'expert' ? 100 : skill.level === 'advanced' ? 75 : skill.level === 'intermediate' ? 50 : 25} 
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Certifications</h3>
            <div className="space-y-3">
              {employee.certificates.map((cert) => (
                <div key={cert.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-gray-400" />
                        <h4>{cert.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600">{cert.issuedBy}</p>
                    </div>
                    <StatusBadge status={cert.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Issue Date: </span>
                      <span>{cert.issueDate}</span>
                    </div>
                    {cert.expiryDate && (
                      <div>
                        <span className="text-gray-600">Expiry: </span>
                        <span>{cert.expiryDate}</span>
                      </div>
                    )}
                  </div>
                  {cert.credentialId && (
                    <p className="text-sm text-gray-500 mt-2 font-mono">ID: {cert.credentialId}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Assigned Machines Tab */}
        <TabsContent value="machines" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Machine Certifications & Assignments</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Machine</TableHead>
                  <TableHead>Certification</TableHead>
                  <TableHead>Assigned Date</TableHead>
                  <TableHead>Proficiency Level</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.assignedMachines.map((machine) => (
                  <TableRow key={machine.machineId}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Wrench className="w-4 h-4 text-gray-400" />
                        {machine.machineName}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge>{machine.certification}</Badge>
                    </TableCell>
                    <TableCell>{machine.assignedDate}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          machine.proficiencyLevel === 'master' ? 'bg-purple-100 text-purple-700' :
                          machine.proficiencyLevel === 'senior' ? 'bg-blue-100 text-blue-700' :
                          machine.proficiencyLevel === 'operator' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }
                      >
                        {machine.proficiencyLevel}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Performance Reviews</h3>
            <div className="space-y-6">
              {employee.performanceReviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4>Performance Review</h4>
                      <p className="text-sm text-gray-500">{review.date} • Reviewed by {review.reviewer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="text-2xl text-green-600">{review.rating}/5.0</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Strengths</p>
                      <ul className="space-y-1">
                        {review.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-green-600">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Areas for Improvement</p>
                      <ul className="space-y-1">
                        {review.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-yellow-600">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Goals for Next Period</p>
                      <ul className="space-y-1">
                        {review.goals.map((goal, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span className="text-blue-600">•</span>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Attendance Tab */}
        <TabsContent value="attendance" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-4">Attendance Record (Last 6 Months)</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Month</TableHead>
                  <TableHead>Present</TableHead>
                  <TableHead>Absent</TableHead>
                  <TableHead>Late</TableHead>
                  <TableHead>Overtime (hrs)</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.attendance.map((record) => {
                  const totalDays = record.present + record.absent;
                  const attendanceRate = ((record.present / totalDays) * 100).toFixed(1);
                  return (
                    <TableRow key={record.month}>
                      <TableCell>{record.month}</TableCell>
                      <TableCell className="text-green-600">{record.present}</TableCell>
                      <TableCell className={record.absent > 0 ? 'text-red-600' : ''}>{record.absent}</TableCell>
                      <TableCell className={record.late > 0 ? 'text-yellow-600' : ''}>{record.late}</TableCell>
                      <TableCell>{record.overtime}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={parseFloat(attendanceRate)} className="w-20" />
                          <span className="text-sm">{attendanceRate}%</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
