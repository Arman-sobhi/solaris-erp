import { useState } from 'react';
import { Plus, Phone, Mail, Calendar, DollarSign, User, MoreVertical, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { mockLeads, pipelineStages } from '../data/mockCRM';
import { cn } from '../components/ui/utils';

interface CRMPipelinePageProps {
  onViewLead?: (leadId: string) => void;
}

export function CRMPipelinePage({ onViewLead }: CRMPipelinePageProps) {
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      'website': 'bg-blue-100 text-blue-700',
      'referral': 'bg-green-100 text-green-700',
      'cold-call': 'bg-orange-100 text-orange-700',
      'event': 'bg-purple-100 text-purple-700',
      'social-media': 'bg-pink-100 text-pink-700',
    };
    return colors[source] || 'bg-gray-100 text-gray-700';
  };

  const totalValue = mockLeads.reduce((sum, lead) => sum + lead.value, 0);
  const avgProbability = mockLeads.reduce((sum, lead) => sum + lead.probability, 0) / mockLeads.length;

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Sales Pipeline</h1>
          <p className="text-gray-500">Track and manage your sales opportunities</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Pipeline Value</p>
              <p className="text-2xl">${(totalValue / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Leads</p>
              <p className="text-2xl">{mockLeads.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Deal Size</p>
              <p className="text-2xl">${(totalValue / mockLeads.length / 1000).toFixed(0)}K</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Probability</p>
              <p className="text-2xl">{avgProbability.toFixed(0)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pipeline Kanban */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {pipelineStages.map((stage) => (
            <div key={stage.id} className="w-80 flex-shrink-0">
              <Card className="h-full">
                {/* Stage Header */}
                <div className="p-4 border-b bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <h3>{stage.name}</h3>
                    <Badge variant="outline">{stage.leads.length}</Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    ${stage.leads.reduce((sum, l) => sum + l.value, 0).toLocaleString()}
                  </p>
                </div>

                {/* Stage Content */}
                <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                  {stage.leads.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <p className="text-sm">No leads in this stage</p>
                    </div>
                  ) : (
                    stage.leads.map((lead) => (
                      <Card
                        key={lead.id}
                        className={cn(
                          'p-4 cursor-pointer hover:shadow-md transition-shadow',
                          selectedLead === lead.id && 'ring-2 ring-blue-500'
                        )}
                        onClick={() => setSelectedLead(lead.id)}
                      >
                        {/* Lead Header */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="text-sm mb-1">{lead.name}</h4>
                            <p className="text-xs text-gray-500">{lead.company}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => onViewLead?.(lead.id)}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Phone className="w-4 h-4 mr-2" />
                                Call
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="w-4 h-4 mr-2" />
                                Email
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>

                        {/* Lead Value */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg">${(lead.value / 1000).toFixed(0)}K</span>
                          <Badge variant="outline" className="text-xs">
                            {lead.probability}% likely
                          </Badge>
                        </div>

                        {/* Lead Meta */}
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <User className="w-3 h-3" />
                            <span>{lead.assignedTo}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Calendar className="w-3 h-3" />
                            <span>Next: {lead.nextFollowUp || 'Not scheduled'}</span>
                          </div>
                        </div>

                        {/* Source Badge */}
                        <Badge variant="outline" className={cn('text-xs', getSourceColor(lead.source))}>
                          {lead.source.replace(/-/g, ' ')}
                        </Badge>

                        {/* Activities Indicator */}
                        {lead.activities.length > 0 && (
                          <div className="mt-3 pt-3 border-t">
                            <p className="text-xs text-gray-500">
                              {lead.activities.length} activities • Last: {lead.lastContact}
                            </p>
                          </div>
                        )}
                      </Card>
                    ))
                  )}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Lead Quick View */}
      {selectedLead && (
        <Card className="p-6">
          {(() => {
            const lead = mockLeads.find(l => l.id === selectedLead);
            if (!lead) return null;
            
            return (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3>{lead.name}</h3>
                    <p className="text-gray-500">{lead.company}</p>
                  </div>
                  <Button size="sm" onClick={() => onViewLead?.(lead.id)}>
                    View Full Details
                  </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-sm">{lead.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="text-sm">{lead.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Value</p>
                    <p className="text-sm">${lead.value.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Probability</p>
                    <p className="text-sm">{lead.probability}%</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Notes</p>
                  <p className="text-sm text-gray-700">{lead.notes}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Recent Activities</p>
                  <div className="space-y-2">
                    {lead.activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 text-sm">
                        <Badge variant="outline" className="text-xs capitalize">
                          {activity.type}
                        </Badge>
                        <div className="flex-1">
                          <p className="text-gray-700">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.date} • {activity.user}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </Card>
      )}
    </div>
  );
}
