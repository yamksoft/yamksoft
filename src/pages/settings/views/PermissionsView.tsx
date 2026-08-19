/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useState, useMemo, useEffect } from 'react';
import {
    Search,
    CheckCircle2, Save,
    RotateCcw, ShieldAlert, ChevronDown,
    ChevronUp, Settings
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { securityService } from '../../../api/services/security.service';
import { Loading } from '../../../components/common/Loading/Loading';
import type { RoleDto } from '../../../types/security.types';
import type { PermissionGroupDto, PermissionDto } from '../../../types/settings.types';
import toast from 'react-hot-toast';

export function PermissionsView() {
    const queryClient = useQueryClient();
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const [searchText, setSearchText] = useState('');
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
    const [activePermissions, setActivePermissions] = useState<string[]>([]);

    // Fetch Roles
    const { data: roles, isLoading: rolesLoading } = useQuery<RoleDto[]>({
        queryKey: ['security', 'roles'],
        queryFn: securityService.getRoles,
    });

    // Fetch All Permissions (Metadata)
    const { data: permissionGroups, isLoading: permsLoading } = useQuery<PermissionGroupDto[]>({
        queryKey: ['security', 'permissions-metadata'],
        queryFn: securityService.getPermissions,
    });

    // Fetch Current Role Permissions
    const { data: currentRole, isLoading: roleDetailLoading } = useQuery<RoleDto | null>({
        queryKey: ['security', 'role', selectedRoleId],
        queryFn: () => selectedRoleId ? securityService.getRole(selectedRoleId) : Promise.resolve(null),
        enabled: !!selectedRoleId,
    });

    // Update Permissions Mutation
    const updateMutation = useMutation({
        mutationFn: (perms: string[]) =>
            selectedRoleId ? securityService.updateRolePermissions(selectedRoleId, perms) : Promise.reject('No role selected'),
        onSuccess: () => {
            toast.success('تم حفظ الصلاحيات بنجاح');
            queryClient.invalidateQueries({ queryKey: ['security', 'role', selectedRoleId] });
        },
        onError: () => toast.error('حدث خطأ أثناء حفظ الصلاحيات'),
    });

    // Set default role and local permissions state
    useEffect(() => {
        if (roles && roles.length > 0 && selectedRoleId === null) {
            setSelectedRoleId(roles[0].id);
        }
    }, [roles, selectedRoleId]);

    useEffect(() => {
        if (currentRole) {
            setActivePermissions(currentRole.permissions || []);
        }
    }, [currentRole]);

    // Initial expansion
    useEffect(() => {
        if (permissionGroups && expandedGroups.length === 0) {
            setExpandedGroups(permissionGroups.map(g => g.key));
        }
    }, [permissionGroups]);

    const toggleGroup = (key: string) => {
        setExpandedGroups(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const togglePermission = (key: string) => {
        setActivePermissions(prev =>
            prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
        );
    };

    const handleSelectAll = () => {
        if (!permissionGroups) return;
        const allKeys = permissionGroups.flatMap(g => g.permissions.map(p => p.key));
        setActivePermissions(allKeys);
    };

    const handleUnselectAll = () => {
        setActivePermissions([]);
    };

    const filteredGroups = useMemo(() => {
        if (!permissionGroups) return [];
        if (!searchText) return permissionGroups;

        return permissionGroups.map((group: PermissionGroupDto) => ({
            ...group,
            permissions: group.permissions.filter((p: PermissionDto) =>
                p.displayName.includes(searchText) ||
                p.description.includes(searchText) ||
                p.key.includes(searchText)
            )
        })).filter((group: PermissionGroupDto) => group.permissions.length > 0);
    }, [permissionGroups, searchText]);

    const hasChanges = useMemo(() => {
        if (!currentRole) return false;
        const currentPerms = [...(currentRole.permissions || [])].sort();
        const localPerms = [...activePermissions].sort();
        return JSON.stringify(currentPerms) !== JSON.stringify(localPerms);
    }, [currentRole, activePermissions]);

    if (rolesLoading || permsLoading) return <Loading message="جاري تحميل الصلاحيات..." />;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-tertiary text-primary rounded-lg">
                        <ShieldAlert className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-primary">إدارة صلاحيات الأدوار</h2>
                        <p className="text-sm text-secondary">تخصيص الصلاحيات للمستخدمين والأدوار الوظيفية</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    {hasChanges && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-warning/10 text-warning rounded-full text-[10px] font-black border border-warning/20 animate-pulse">
                            <span className="w-2 h-2 bg-warning rounded-full" />
                            هناك تغييرات غير محفوظة
                        </div>
                    )}
                    <button
                        onClick={() => updateMutation.mutate(activePermissions)}
                        disabled={!hasChanges || updateMutation.isPending}
                        className="btn btn-primary gap-2 min-w-40"
                    >
                        {updateMutation.isPending ? (
                            <div className="loading loading-spinner loading-xs" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        حفظ الصلاحيات
                    </button>
                </div>
            </div>

            {/* Toolbar Card */}
            <div className="card p-4 flex flex-wrap gap-4 items-center bg-tertiary/20">
                <div className="flex-1 min-w-[250px]">
                    <div className="relative">
                        <Search className="absolute right-3 top-2.5 w-4 h-4 text-tertiary opacity-50" />
                        <input
                            type="text"
                            placeholder="بحث في مسميات الصلاحيات أو الكود..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="form-input pr-10"
                        />
                    </div>
                </div>
                <div className="w-56">
                    <select
                        value={selectedRoleId || ''}
                        onChange={(e) => setSelectedRoleId(Number(e.target.value))}
                        className="form-select font-black text-primary"
                    >
                        {roles?.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-1 border-r border-primary/10 pr-4">
                    <button
                        onClick={handleSelectAll}
                        className="btn btn-link btn-xs !text-primary !no-underline font-black px-2 hover:bg-primary/5 rounded-lg"
                    >
                        تحديد الكل
                    </button>
                    <div className="w-1 h-1 bg-secondary/30 rounded-full mx-1" />
                    <button
                        onClick={handleUnselectAll}
                        className="btn btn-link btn-xs !text-secondary !no-underline font-black px-2 hover:bg-error/5 hover:!text-error rounded-lg"
                    >
                        إلغاء الكل
                    </button>
                </div>
                <button
                    onClick={() => setActivePermissions(currentRole?.permissions || [])}
                    className="btn-icon bg-tertiary hover:bg-primary/10"
                    title="استعادة الحالة السابقة"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>

            {/* Permissions Matrix */}
            <div className="space-y-4">
                {roleDetailLoading ? (
                    <div className="flex justify-center py-20 opacity-50">
                        <div className="loading loading-spinner loading-lg text-primary" />
                    </div>
                ) : filteredGroups.map((group) => (
                    <div key={group.key} className="card overflow-hidden transition-all duration-300 border-primary/5 hover:border-primary/20">
                        <button
                            onClick={() => toggleGroup(group.key)}
                            className="w-full flex items-center justify-between px-6 py-5 bg-tertiary shadow-sm hover:bg-tertiary/80 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/5 rounded-xl">
                                    <Settings className="w-5 h-5 text-primary" />
                                </div>
                                <div className="text-right">
                                    <span className="font-black text-primary block leading-none mb-1">{group.displayName}</span>
                                    <span className="text-[10px] text-secondary font-bold">
                                        إدارة {group.permissions.length} صلاحيات مختلفة
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="status-badge info text-[10px]">
                                    {group.permissions.length}
                                </span>
                                {expandedGroups.includes(group.key) ? <ChevronUp className="w-4 h-4 text-tertiary" /> : <ChevronDown className="w-4 h-4 text-tertiary" />}
                            </div>
                        </button>

                        <div className={`transition-all duration-300 overflow-hidden ${expandedGroups.includes(group.key) ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {group.permissions.map((perm: PermissionDto) => {
                                    const isSelected = activePermissions.includes(perm.key);
                                    return (
                                        <div
                                            key={perm.key}
                                            onClick={() => togglePermission(perm.key)}
                                            className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer group select-none ${isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-primary/5 hover:border-primary/20 bg-tertiary/10'}`}
                                        >
                                            <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-white scale-110 shadow-md shadow-primary/20' : 'border-primary/20 bg-surface group-hover:border-primary'}`}>
                                                {isSelected && <CheckCircle2 className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <h4 className={`text-xs font-black mb-1 transition-colors ${isSelected ? 'text-primary' : 'text-primary/70'}`}>
                                                    {perm.displayName}
                                                </h4>
                                                <p className="text-[10px] text-secondary leading-relaxed font-bold opacity-80">
                                                    {perm.description}
                                                </p>
                                                <div className="mt-3 py-1 px-2 bg-secondary/10 rounded-md w-fit opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <code className="text-[9px] text-secondary font-mono tracking-tight">
                                                        {perm.key}
                                                    </code>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ))}

                {filteredGroups.length === 0 && (
                    <div className="py-20 text-center card bg-tertiary/10">
                        <Search className="w-12 h-12 text-tertiary mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-black text-primary opacity-50">لا توجد نتائج مطابقة لبحثك</h3>
                        <p className="text-sm text-secondary font-bold">يرجى تجربة كلمات بحث أخرى</p>
                    </div>
                )}
            </div>
        </div>
    );
}
