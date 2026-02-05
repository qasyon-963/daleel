import { useState, useMemo } from 'react';
import { Search, Filter, GraduationCap, Building2, BookOpen, ChevronDown, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  type AdmissionEntry,
  filterAdmissionEntries,
  getUniqueUniversities,
  getUniqueMajors,
  getUniqueCategories,
} from '@/data/admission-requirements';

interface AdmissionsTableProps {
  entries: AdmissionEntry[];
}

export function AdmissionsTable({ entries }: AdmissionsTableProps) {
  const [search, setSearch] = useState('');
  const [branch, setBranch] = useState('all');
  const [university, setUniversity] = useState('all');
  const [category, setCategory] = useState('all');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const universities = useMemo(() => getUniqueUniversities(entries), [entries]);
  const categories = useMemo(() => getUniqueCategories(entries), [entries]);

  const filteredEntries = useMemo(() => {
    return filterAdmissionEntries(entries, {
      search,
      branch,
      university,
      category,
    });
  }, [entries, search, branch, university, category]);

  const activeFiltersCount = [branch, university, category].filter(f => f !== 'all').length;

  const clearFilters = () => {
    setBranch('all');
    setUniversity('all');
    setCategory('all');
    setSearch('');
  };

  const getBranchColor = (branchType: string) => {
    switch (branchType) {
      case 'علمي':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'أدبي':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'علمي وأدبي':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getScoreColor = (score: string) => {
    const numScore = parseInt(score);
    if (numScore >= 80) return 'text-red-600 dark:text-red-400 font-bold';
    if (numScore >= 75) return 'text-orange-600 dark:text-orange-400 font-semibold';
    if (numScore >= 60) return 'text-yellow-600 dark:text-yellow-400 font-medium';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            الحدود الدنيا للتخصصات
          </div>
          <Badge variant="secondary" className="text-sm">
            {filteredEntries.length} تخصص
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* شريط البحث */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ابحث عن تخصص أو جامعة..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
          </div>
          <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                الفلاتر
                {activeFiltersCount > 0 && (
                  <Badge variant="default" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {activeFiltersCount}
                  </Badge>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${filtersOpen ? 'rotate-180' : ''}`} />
              </Button>
            </CollapsibleTrigger>
          </Collapsible>
        </div>

        {/* الفلاتر */}
        <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
          <CollapsibleContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-lg bg-muted/50">
              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4" />
                  الفرع
                </label>
                <Select value={branch} onValueChange={setBranch}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع الفروع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفروع</SelectItem>
                    <SelectItem value="علمي">علمي</SelectItem>
                    <SelectItem value="أدبي">أدبي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  الجامعة
                </label>
                <Select value={university} onValueChange={setUniversity}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع الجامعات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الجامعات</SelectItem>
                    {universities.map(uni => (
                      <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4" />
                  الفئة
                </label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="جميع الفئات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1.5">
                <X className="h-4 w-4" />
                مسح الفلاتر
              </Button>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* الجدول */}
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-right font-semibold">التخصص</TableHead>
                  <TableHead className="text-right font-semibold">الجامعة</TableHead>
                  <TableHead className="text-center font-semibold">الحد الأدنى</TableHead>
                  <TableHead className="text-center font-semibold">الفرع</TableHead>
                  <TableHead className="text-right font-semibold">ملاحظات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      لا توجد نتائج مطابقة للبحث
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEntries.map((entry) => (
                    <TableRow key={entry.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="font-medium">{entry.major}</TableCell>
                      <TableCell className="text-muted-foreground">{entry.university}</TableCell>
                      <TableCell className={`text-center ${getScoreColor(entry.minScore)}`}>
                        {entry.minScore}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary" className={getBranchColor(entry.branch)}>
                          {entry.branch}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {entry.notes || '—'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {filteredEntries.length > 0 && (
          <p className="text-xs text-muted-foreground text-center">
            عرض {filteredEntries.length} من أصل {entries.length} تخصص
          </p>
        )}
      </CardContent>
    </Card>
  );
}
