<template>
    <DashboardLayout>
        <div class="premium-shell" :class="{ 'is-loading': profileStore.isLoading }">
            <div class="content-limiter">

                <!-- 1. HEADER SECTION -->
                <header class="profile-header">
                    <div class="cover-container" @click="openCoverModal">
                        <!-- SKELETON COVER -->
                        <div v-if="profileStore.isLoading" class="skeleton skeleton-cover"></div>

                        <template v-else>
                            <img v-if="profileStore.user?.cover" :src="profileStore.user.cover" class="cover-image" />
                            <div v-else class="cover-placeholder"></div>
                            <div class="cover-overlay">
                                <i class="bi bi-pencil-square"></i>
                                <span>{{ profileStore.user?.cover ? 'កែប្រែ​រូបភាព​' : 'បន្ថែម​រូបភាព' }}</span>
                            </div>
                            <span v-if="profileStore.user?.cover" class="delete-cover-span"
                                @click.stop="showCoverDeleteModal = true">
                                <i class="bi bi-trash3"></i>
                            </span>
                        </template>
                        <div class="scanline"></div>
                    </div>

                    <div class="profile-meta-bar">
                        <div class="avatar-section">
                            <div class="avatar-outer" @click="triggerUpload">
                                <!-- SKELETON AVATAR -->
                                <div v-if="profileStore.isLoading" class="skeleton skeleton-avatar"></div>

                                <template v-else>
                                    <img v-if="profileStore.user?.avatar" :src="profileStore.user.avatar" />
                                    <div v-else class="avatar-letter">{{ profileStore.user?.full_name?.charAt(0) || 'U'
                                        }}
                                    </div>
                                    <span v-if="profileStore.user?.avatar" class="delete-avatar-span"
                                        @click.stop="showAvatarDeleteModal = true">
                                        <i class="bi bi-x"></i>
                                    </span>
                                </template>
                            </div>
                            <div class="status-indicator"></div>
                        </div>

                        <div class="user-details">
                            <!-- SKELETON TEXT -->
                            <div v-if="profileStore.isLoading" class="skeleton-text-group">
                                <div class="skeleton skeleton-line title-width"></div>
                                <div class="skeleton skeleton-line meta-width"></div>
                            </div>

                            <template v-else>
                                <div class="name-badge-row">
                                    <h1 class="display-name">{{ profileStore.user?.full_name || 'Anonymous User' }}</h1>
                                    <span class="role-chip" v-for="role in profileStore.user?.roles" :key="role.id">
                                        {{ role.name }}
                                    </span>
                                </div>
                                <div class="meta-info">
                                    <span><i class="bi bi-fingerprint"></i> ID: {{ profileStore.user?.id || '---'
                                        }}</span>
                                    <span class="dot-sep"></span>
                                    <span><i class="bi bi-geo-alt"></i> {{ profileStore.user?.current_city || 'Neo-City'
                                        }}</span>
                                </div>
                            </template>
                        </div>

                        <div class="header-actions">
                            <button class="edit-core-btn" @click="openEditModal" :disabled="profileStore.isLoading">
                                <i class="bi bi-cpu"></i> កែប្រែ​ព័ត៌មាន
                            </button>
                        </div>
                    </div>
                </header>

                <!-- 2. BENTO STATS -->
                <div class="stats-grid">
                    <template v-if="profileStore.isLoading">
                        <div v-for="i in 3" :key="i" class="stat-item">
                            <div class="skeleton skeleton-icon"></div>
                            <div class="s-labels">
                                <div class="skeleton skeleton-line sm-width"></div>
                                <div class="skeleton skeleton-line md-width"></div>
                            </div>
                        </div>
                    </template>

                    <template v-else>
                        <div class="stat-item">
                            <div class="s-icon purple"><i class="bi bi-shield-check"></i></div>
                            <div class="s-labels"><span class="s-top">សុចរិតភាព</span><span class="s-val">{{
                                profileCompletion }}%</span></div>
                        </div>
                        <div class="stat-item">
                            <div class="s-icon blue"><i class="bi bi-broadcast-pin"></i></div>
                            <div class="s-labels"><span class="s-top">ស្ថានភាព</span><span class="s-val">Active</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="s-icon green"><i class="bi bi-clock-history"></i></div>
                            <div class="s-labels"><span class="s-top">ពេលវេលាចុងក្រោយ</span><span class="s-val">{{
                                lastLoginDisplay }}</span></div>
                        </div>
                    </template>
                </div>

                <!-- 3. NAVIGATION & CONTENT -->
                <div class="main-layout-grid">
                    <nav class="side-nav">
                        <button v-for="t in tabs" :key="t.id" :class="['nav-link', { active: activeTab === t.id }]"
                            @click="activeTab = t.id">
                            <i :class="t.icon"></i> {{ t.label }}
                        </button>
                    </nav>

                    <section class="content-panel">
                        <!-- Overview Tab -->
                        <div v-if="activeTab === 'overview'" class="tab-pane">
                            <div class="data-grid">
                                <template v-if="profileStore.isLoading">
                                    <div v-for="i in 7" :key="i" class="data-card" :class="{ 'span-2': i === 1 }">
                                        <div class="skeleton skeleton-line sm-width"></div>
                                        <div class="skeleton skeleton-line lg-width" style="margin-top: 8px;"></div>
                                    </div>
                                </template>

                                <template v-else>
                                    <div class="data-card span-2"><label>អត្តសញ្ញាណ</label>
                                        <p class="highlight">{{ profileStore.user?.full_name }}</p>
                                    </div>
                                    <div class="data-card"><label>អ៊ីមែល</label>
                                        <p>{{ profileStore.user?.email }}</p>
                                    </div>
                                    <div class="data-card"><label>លេខទូរសព្ទ</label>
                                        <p>{{ profileStore.user?.phone || 'Not Set' }}</p>
                                    </div>
                                    <div class="data-card"><label>ទីកន្លែងបច្ចុប្បន្ន</label>
                                        <p>{{ profileStore.user?.current_city || 'Unknown' }}</p>
                                    </div>
                                    <div class="data-card"><label>ទីកន្លែងកំណេីត</label>
                                        <p>{{ profileStore.user?.home_town || 'Unknown' }}</p>
                                    </div>
                                    <div class="data-card"><label>ថ្ងៃខែឆ្នាំកើត</label>
                                        <p>{{ profileStore.user?.dob || 'Not Set' }}</p>
                                    </div>
                                    <div class="data-card"><label>ភេទ</label>
                                        <p>{{ profileStore.user?.gender === 1 ? 'ប្រុស' : profileStore.user?.gender === 2
                                            ?
                                            'ស្រី' : 'Not Set' }}</p>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <!-- Security Tab -->
                        <div v-if="activeTab === 'security'" class="tab-pane">
                            <div class="security-box">
                                <input type="email" :value="profileStore.user?.email" autocomplete="off" name="username"
                                    style="display: none;" readonly>

                                <div class="input-wrap" :class="{ 'has-error': passwordFormErrors.old_pass }">
                                    <label>ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
                                    <div class="password-field-wrapper">
                                        <input :type="showPasswords.old ? 'text' : 'password'"
                                            v-model="passwordForm.old_pass" placeholder="••••••••"
                                            autocomplete="current-password" @blur="validatePasswordField('old_pass')" />
                                        <button type="button" class="eye-toggle"
                                            @click="showPasswords.old = !showPasswords.old">
                                            <i :class="showPasswords.old ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                        </button>
                                    </div>
                                    <span class="error-text" v-if="passwordFormErrors.old_pass">{{
                                        passwordFormErrors.old_pass }}</span>
                                </div>

                                <div class="input-wrap" :class="{ 'has-error': passwordFormErrors.new_pass }">
                                    <label>ពាក្យសម្ងាត់ថ្មី</label>
                                    <div class="password-field-wrapper">
                                        <input :type="showPasswords.new ? 'text' : 'password'"
                                            v-model="passwordForm.new_pass" placeholder="••••••••"
                                            autocomplete="new-password" @blur="validatePasswordField('new_pass')" />
                                        <button type="button" class="eye-toggle"
                                            @click="showPasswords.new = !showPasswords.new">
                                            <i :class="showPasswords.new ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                        </button>
                                    </div>
                                    <span class="error-text" v-if="passwordFormErrors.new_pass">{{
                                        passwordFormErrors.new_pass }}</span>
                                </div>

                                <div class="input-wrap"
                                    :class="{ 'has-error': passwordFormErrors.new_pass_confirmation }">
                                    <label>បញ្ជាក់ពាក្យសម្ងាត់</label>
                                    <div class="password-field-wrapper">
                                        <input :type="showPasswords.confirm ? 'text' : 'password'"
                                            v-model="passwordForm.new_pass_confirmation" placeholder="••••••••"
                                            autocomplete="new-password"
                                            @blur="validatePasswordField('new_pass_confirmation')" />
                                        <button type="button" class="eye-toggle"
                                            @click="showPasswords.confirm = !showPasswords.confirm">
                                            <i :class="showPasswords.confirm ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                                        </button>
                                    </div>
                                    <span class="error-text" v-if="passwordFormErrors.new_pass_confirmation">{{
                                        passwordFormErrors.new_pass_confirmation }}</span>
                                </div>

                                <div class="security-footer">
                                    <button class="env-btn-primary" @click="updatePassword"
                                        :disabled="profileStore.isProcessing">
                                        <i v-if="!profileStore.isProcessing" class="bi bi-shield-lock"></i>
                                        <span v-else class="spinner-border spinner-border-sm me-2"></span>
                                        {{ profileStore.isProcessing ? 'កំពុងកែប្រែ...' : 'កែប្រែពាក្យសម្ងាត់' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <!-- MODALS -->
            <Teleport to="body">
                <!-- COVER DELETE CONFIRMATION MODAL -->
                <Transition name="ref-modal">
                    <div v-if="showCoverDeleteModal" class="modal-backdrop" @click.self="showCoverDeleteModal = false">
                        <div class="env-modal-surface mini-modal">
                            <div class="env-modal-header">
                                <div class="env-header-left">
                                    <div class="env-icon-box danger"><i class="bi bi-exclamation-triangle"></i></div>
                                    <div class="env-header-text">
                                        <h3>លុប?</h3>
                                        <p>តើអ្នកប្រាកដថាចង់លុបរូបភាពនេះចេញមែនទេ?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="env-modal-footer">
                                <div class="env-footer-row">
                                    <button class="env-btn-dark" @click="showCoverDeleteModal = false">ទេ</button>
                                    <button class="env-btn-danger-solid" @click="confirmDeleteCover"
                                        :disabled="profileStore.isProcessing">
                                        {{ profileStore.isProcessing ? 'ពុងលុប...' : 'យល់ព្រម' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                <!-- AVATAR DELETE CONFIRMATION MODAL -->
                <Transition name="ref-modal">
                    <div v-if="showAvatarDeleteModal" class="modal-backdrop"
                        @click.self="showAvatarDeleteModal = false">
                        <div class="env-modal-surface mini-modal">
                            <div class="env-modal-header">
                                <div class="env-header-left">
                                    <div class="env-icon-box danger"><i class="bi bi-exclamation-triangle"></i></div>
                                    <div class="env-header-text">
                                        <h3>លុប?</h3>
                                        <p>តើអ្នកប្រាកដថាចង់លុបរូបភាពនេះចេញមែនទេ?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="env-modal-footer">
                                <div class="env-footer-row">
                                    <button class="env-btn-dark" @click="showAvatarDeleteModal = false">ទេ</button>
                                    <button class="env-btn-danger-solid" @click="confirmDeleteAvatar"
                                        :disabled="profileStore.isProcessing">
                                        {{ profileStore.isProcessing ? 'ពុងលុប...' : 'យល់ព្រម' }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>

                <!-- COVER MODAL (UPLOAD) -->
                <Transition name="ref-modal">
                    <div v-if="showCoverModal" class="modal-backdrop" @click.self="showCoverModal = false">
                        <div class="env-modal-surface">
                            <div class="env-modal-header">
                                <div class="env-header-left">
                                    <div class="env-icon-box"><i class="bi bi-image"></i></div>
                                    <div class="env-header-text">
                                        <h3>បញ្ចូល​រូបភាព</h3>
                                        <p>កែប្រែរូបភាពរបស់អ្នក</p>
                                    </div>
                                </div>
                                <button class="env-close-btn" @click="showCoverModal = false"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="env-modal-body">
                                <div class="env-preview-zone" @click="triggerCoverPicker">
                                    <img v-if="coverPreview" :src="coverPreview" class="env-img-preview" />
                                    <div v-else class="env-empty-preview"><i class="bi bi-cloud-arrow-up"></i></div>
                                </div>
                                <button class="env-choose-btn" @click="triggerCoverPicker">
                                    {{ coverFile ? 'Change Selection' : 'ជ្រើសរើស​រូបភាព' }}
                                </button>
                                <p class="env-hint-text">Max file size 5MB. Recommended size 1200×400.</p>
                            </div>
                            <div class="env-modal-footer">
                                <div class="env-footer-row">
                                    <button class="env-btn-dark" @click="showCoverModal = false">លុប</button>
                                    <button class="env-btn-dark" @click="openCoverFull" :disabled="!coverPreview">មេីលរូបភាព</button>
                                </div>
                                <button class="env-btn-submit" @click="uploadCoverFile"
                                    :disabled="!coverFile || profileStore.isProcessing">
                                    {{ profileStore.isProcessing ? 'បញ្ចូលing...' : 'បញ្ចូល' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>

                <!-- EDIT PROFILE MODAL -->
                <Transition name="ref-modal">
                    <div v-if="showEditModal" class="modal-backdrop" @click.self="showEditModal = false">
                        <div class="core-modal-surface">
                            <div class="core-modal-header">
                                <h3><i class="bi bi-cpu"></i> ព័ត៌មានរបស់អស់លោក</h3>
                                <button @click="showEditModal = false" class="env-close-btn"><i
                                        class="bi bi-x-lg"></i></button>
                            </div>
                            <div class="core-modal-body">
                                <div class="core-grid">
                                    <div class="core-input" :class="{ 'has-error': personalFormErrors.full_name }">
                                        <label>ឈ្មោះ</label>
                                        <input v-model="personalForm.full_name"
                                            @blur="validatePersonalField('full_name')" />
                                        <span class="error-text" v-if="personalFormErrors.full_name">{{
                                            personalFormErrors.full_name }}</span>
                                    </div>
                                    <div class="core-input" :class="{ 'has-error': personalFormErrors.email }">
                                        <label>អ៊ីម៉ែល</label>
                                        <input v-model="personalForm.email" @blur="validatePersonalField('email')" />
                                        <span class="error-text" v-if="personalFormErrors.email">{{
                                            personalFormErrors.email }}</span>
                                    </div>
                                    <div class="core-input" :class="{ 'has-error': personalFormErrors.phone }">
                                        <label>លេខទូរស័ព្ទ</label>
                                        <input v-model="personalForm.phone" @blur="validatePersonalField('phone')" />
                                        <span class="error-text" v-if="personalFormErrors.phone">{{
                                            personalFormErrors.phone }}</span>
                                    </div>
                                    <div class="core-input"><label>ថ្ងៃខែឆ្នាំកើត</label><input v-model="personalForm.dob"
                                            type="date" /></div>
                                    <div class="core-input">
                                        <label>ភេទ</label>
                                        <select v-model="personalForm.gender">
                                            <option :value="null">Select</option>
                                            <option :value="1">Male</option>
                                            <option :value="2">Female</option>
                                        </select>
                                    </div>
                                    <div class="core-input"><label>ទីកន្លែងបច្ចុប្បន្ន</label><input
                                            v-model="personalForm.current_city" /></div>
                                    <div class="core-input"><label>ទីកន្លែងកំណេីត</label><input
                                            v-model="personalForm.home_town" /></div>
                                    <div class="core-input"><label>ប្រវត្តិរូប</label><input
                                            v-model="personalForm.portfolio_link" />
                                    </div>
                                </div>
                            </div>
                            <div class="core-modal-footer">
                                <button class="env-btn-dark" @click="showEditModal = false">បោះបង់</button>
                                <button class="env-btn-primary" @click="savePersonalInfo"
                                    :disabled="profileStore.isProcessing">
                                    {{ profileStore.isProcessing ? 'រក្សាទុកing...' : 'រក្សាទុក' }}
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition>
            </Teleport>

            <!-- Hidden Inputs -->
            <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" accept="image/*" />
            <input type="file" ref="coverFileInput" @change="handleCoverFileChange" style="display: none"
                accept="image/*" />
        </div>
    </DashboardLayout>
</template>

<script setup>
import { ref, onMounted, reactive, computed, watch } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { useToast } from '@/composables/useToast'
import { useConfirm } from '@/composables/useConfirm'
import { useFormValidation, validationRules } from '@/composables/useFormValidation'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const profileStore = useProfileStore()
const toast = useToast()
const confirm = useConfirm()

// UI States
const activeTab = ref('overview')
const fileInput = ref(null)
const coverFileInput = ref(null)
const showEditModal = ref(false)
const showCoverModal = ref(false)
const showAvatarDeleteModal = ref(false)
const showCoverDeleteModal = ref(false)
const coverFile = ref(null)
const coverPreview = ref('')
const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const showPasswords = reactive({ old: false, new: false, confirm: false })

const tabs = [
    { id: 'overview', label: 'ទិដ្ឋភាពទូទៅ', icon: 'bi bi-grid-1x2-fill' },
    { id: 'security', label: 'សុវត្ថិភាព', icon: 'bi bi-shield-lock-fill' }
]
const personalForm = reactive({
    full_name: '', email: '', phone: '', dob: '',
    gender: null, current_city: '', home_town: '', portfolio_link: ''
})

const { errors: personalFormErrors, validate: validateAllPersonal, validateField: validatePersonalField } = useFormValidation(personalForm, {
    full_name: [
        validationRules.required('ទាមទារឈ្មោះ'),
        validationRules.maxLength(255, 'ឈ្មោះត្រូវមានតិចជាង 255 តួអក្សរ')
    ],
    email: [
        validationRules.required('ទាមទារអ៊ីម៉ែល'),
        validationRules.email(),
        validationRules.maxLength(255, 'អ៊ីម៉ែលត្រូវមានតិចជាង 255 តួអក្សរ')
    ],
    phone: [
        validationRules.required('ទាមទារលេខទូរសព្ទ'),

        validationRules.maxLength(255, 'លេខទូរសព្ទត្រូវមានតិចជាង 255 តួអក្សរ')
    ],
    portfolio_link: [
        validationRules.url('សូមបញ្ចូល URL ដែលត្រឹមត្រូវ (https://...)')
    ]
})

const passwordForm = reactive({
    old_pass: '',
    new_pass: '',
    new_pass_confirmation: ''
})

const {
    errors: passwordFormErrors,
    validate: validateAllPassword,
    validateField: validatePasswordField,
    reset: resetPasswordValidation
} = useFormValidation(passwordForm, {
    old_pass: [validationRules.required('ទាមទារពាក្យសម្ងាត់បច្ចុប្បន្ន')], 
    new_pass: [
        validationRules.required('ទាមទារពាក្យសម្ងាត់ថ្មី'), 
        validationRules.minLength(8, 'ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួអក្សរ'),
        validationRules.maxLength(255, 'ពាក្យសម្ងាត់ត្រូវមានតិចជាង 255 តួអក្សរ'),
        validationRules.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).+$',
            'រួមបញ្ចូលអក្សរធំ អក្សរតូច លេខ និងសញ្ញា'
        ),
        (value) => value !== passwordForm.old_pass || 'ពាក្យសម្ងាត់ថ្មីមិនអាចដូចនឹងពាក្យសម្ងាត់បច្ចុប្បន្ន'
    ],
    new_pass_confirmation: [
        validationRules.required('ទាមទារការបញ្ជាក់ពាក្យសម្ងាត់'),
        (value) => value === passwordForm.new_pass || 'ពាក្យសម្ងាត់មិនត្រូវគ្នា'
    ]
})

onMounted(async () => { await profileStore.fetchProfile() })

const openEditModal = () => {
    Object.assign(personalForm, profileStore.user)
    showEditModal.value = true
}

const savePersonalInfo = async () => {
    if (!validateAllPersonal()) {
        toast.error('សូមពិនិត្យមើលកំហុស និងព្យាយាមម្តងទៀត')
        return
    }
    try {
        await profileStore.updatePersonalInfo({ ...personalForm })
        toast.success('ព័ត៌មានបានកែប្រែដោយជោគជ័យ')
        showEditModal.value = false
    } catch { toast.error('បរាជ័យក្នុងការកែប្រែព័ត៌មានប្រវត្តិរូប') }
}

const updatePassword = async () => {
    if (!validateAllPassword()) return
    try {
        const res = await profileStore.changePassword(passwordForm)
        if (res?.result === false || res?.success === false || res?.status === false || res?.error || res?.errors) {
            const fieldError = res?.data?.old_pass?.[0] || res?.data?.new_pass?.[0] || res?.data?.new_pass_confirmation?.[0]
            toast.error(fieldError || res?.message || 'ពាក្យសម្ងាត់បច្ចុប្បន្នមិនត្រឹមត្រូវ')
            passwordForm.old_pass = ''; passwordForm.new_pass = ''; passwordForm.new_pass_confirmation = ''
            return
        }
        toast.success(res?.message || 'ពាក្យសម្ងាត់បានកែប្រែដោយជោគជ័យ')
        passwordForm.old_pass = ''; passwordForm.new_pass = ''; passwordForm.new_pass_confirmation = ''
        resetPasswordValidation()
    } catch (err) {
        toast.error(err.response?.data?.message || 'បរាជ័យក្នុងការកែប្រែពាក្យសម្ងាត់')
        passwordForm.old_pass = ''; passwordForm.new_pass = ''; passwordForm.new_pass_confirmation = ''
    }
}

const confirmDeleteAvatar = async () => {
    try {
        await profileStore.removeAvatar()
        toast.success('រុបរូបភាពបានជោគជ័យ')
        showAvatarDeleteModal.value = false
    } catch { toast.error('លុបអត់កេីត​ bro') }
}

const triggerUpload = () => fileInput.value.click()
const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file) {
        if (file.size > MAX_IMAGE_BYTES) {
            toast.error('Avatar image must be 5MB or smaller')
            return
        }
        try {
            await profileStore.uploadAvatar(file)
            toast.success('រូបភាពបានបញ្ចូលដោយជោគជ័យ')
        } catch { toast.error('បញ្ចូលរូបភាពបានជោគជ័យ') }
    }
}

const confirmDeleteCover = async () => {
    try {
        await profileStore.removeCover()
        toast.success('លុបរូបភាពបានជោគជ័យ')
        showCoverDeleteModal.value = false
    } catch { toast.error('លុបអត់កេីត​ bro') }
}

const openCoverModal = () => {
    coverPreview.value = profileStore.user?.cover || ''
    coverFile.value = null
    showCoverModal.value = true
}

const triggerCoverPicker = () => coverFileInput.value.click()
const handleCoverFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.size <= MAX_IMAGE_BYTES) {
        coverFile.value = file
        coverPreview.value = URL.createObjectURL(file)
    } else if (file) toast.error('Max 5MB allowed')
}

const uploadCoverFile = async () => {
    if (!coverFile.value) return
    try {
        await profileStore.uploadCover(coverFile.value)
        toast.success('រូបភាពបានបញ្ចូលដោយជោគជ័យ')
        showCoverModal.value = false
    } catch { toast.error('បរាជ័យក្នុងការបញ្ចូលរូបភាព') }
}

const openCoverFull = () => coverPreview.value && window.open(coverPreview.value, '_blank')

const lastLoginDisplay = computed(() => profileStore.user?.last_login_at ? new Date(profileStore.user.last_login_at).toLocaleString() : 'Active Now')
const profileCompletion = computed(() => {
    const fields = ['full_name', 'email', 'phone', 'avatar', 'cover', 'dob', 'current_city']
    const filled = fields.filter(f => profileStore.user?.[f]).length
    return Math.round((filled / fields.length) * 100)
})

watch(activeTab, (t) => {
    if (t === 'security') {
        resetPasswordValidation();
        passwordForm.old_pass = ''; passwordForm.new_pass = ''; passwordForm.new_pass_confirmation = ''
        showPasswords.old = showPasswords.new = showPasswords.confirm = false
    }
})

watch([showEditModal, showCoverModal, showAvatarDeleteModal, showCoverDeleteModal], (v) =>
    document.body.style.overflow = v.some(x => x) ? 'hidden' : ''
)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

/* SKELETON BASE */
.skeleton {
    position: relative;
    overflow: hidden;
    background-color: #1f1f23;
    border-radius: 4px;
}

.skeleton::after {
    content: "";
    position: absolute;
    inset: 0;
    transform: translateX(-100%);
    background-image: linear-gradient(90deg,
            rgba(255, 255, 255, 0) 0,
            rgba(255, 255, 255, 0.03) 20%,
            rgba(255, 255, 255, 0.06) 60%,
            rgba(255, 255, 255, 0));
    animation: shimmer 2s infinite;
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.skeleton-cover {
    width: 100%;
    height: 100%;
    border-radius: 0;
}

.skeleton-avatar {
    width: 100%;
    height: 100%;
    border-radius: 18px;
}

.skeleton-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
}

.skeleton-line {
    height: 1rem;
    border-radius: 4px;
    margin-bottom: 8px;
}

.skeleton-text-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.title-width {
    width: 220px;
    height: 1.8rem;
}

.meta-width {
    width: 150px;
}

.sm-width {
    width: 40px;
}

.md-width {
    width: 80px;
}

.lg-width {
    width: 120px;
}

.premium-shell {
    --bg-dark: #09090b;
    --surface: #121215;
    --border-color: #27272a;
    --accent-color: #6366f1;
    --text-primary: #fafafa;
    --text-dim: #a1a1aa;
    background: var(--bg-dark);
    color: var(--text-primary);
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    padding: 2rem 1rem;
}

.content-limiter {
    max-width: 1100px;
    margin: 0 auto;
}

/* HEADER */
.profile-header {
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 1.5rem;
}

.cover-container {
    height: 180px;
    position: relative;
    background: #18181b;
    cursor: pointer;
    overflow: hidden;
}

.cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.7;
    transition: transform 0.5s ease;
}

.delete-cover-span {
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 34px;
    height: 34px;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    z-index: 20;
    transition: 0.2s;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.delete-cover-span:hover {
    transform: scale(1.1);
    background: #ef4444;
}

.cover-container:hover .cover-overlay {
    opacity: 1;
}

.cover-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
    font-size: 0.9rem;
    gap: 10px;
    opacity: 0;
    transition: 0.3s ease;
    z-index: 5;
    background: rgba(0, 0, 0, 0.3);
}

.scanline {
    position: absolute;
    inset: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 2;
}

.profile-meta-bar {
    padding: 0 2rem 1.5rem;
    display: flex;
    align-items: flex-end;
    gap: 1.5rem;
    margin-top: -25px;
    position: relative;
    z-index: 10;
}

/* AVATAR SECTION */
.avatar-outer {
    width: 110px;
    height: 110px;
    background: var(--surface);
    border: 4px solid var(--surface);
    border-radius: 22px;
    overflow: visible;
    cursor: pointer;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
    position: relative;
}

.avatar-outer img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 18px;
}

.delete-avatar-span {
    position: absolute;
    top: -6px;
    right: -6px;
    width: 26px;
    height: 26px;
    background: #ef4444;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    border: 3px solid var(--surface);
    z-index: 20;
    transition: 0.2s;
}

.delete-avatar-span:hover {
    transform: scale(1.1);
}

.avatar-outer:hover {
    transform: translateY(-5px);
}

.avatar-letter {
    width: 100%;
    height: 100%;
    background: var(--accent-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    font-weight: 700;
    border-radius: 18px;
}

.display-name {
    font-size: 1.6rem;
    font-weight: 700;
    margin: 0;
}

.role-chip {
    font-size: 0.65rem;
    background: rgba(99, 102, 241, 0.15);
    color: #818cf8;
    padding: 2px 8px;
    border-radius: 6px;
    border: 1px solid rgba(99, 102, 241, 0.3);
    margin-left: 10px;
}

.meta-info {
    display: flex;
    gap: 15px;
    color: var(--text-dim);
    font-size: 0.8rem;
    margin-top: 5px;
}

.edit-core-btn {
    background: var(--accent-color);
    color: white;
    border: none;
    padding: 10px 18px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
}

.edit-core-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

/* STATS */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.stat-item {
    background: var(--surface);
    border: 1px solid var(--border-color);
    padding: 1.2rem;
    border-radius: 16px;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.s-icon {
    width: 42px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.s-icon.purple {
    background: rgba(168, 85, 247, 0.1);
    color: #a855f7;
}

.s-icon.blue {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
}

.s-icon.green {
    background: rgba(34, 197, 94, 0.1);
    color: #22c55e;
}

.s-labels .s-top {
    display: block;
    font-size: 0.7rem;
    color: var(--text-dim);
    font-weight: 600;
}

.s-labels .s-val {
    font-size: 1.2rem;
    font-weight: 700;
}

/* MAIN CONTENT */
.main-layout-grid {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1.5rem;
}

.side-nav {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.nav-link {
    background: transparent;
    border: none;
    color: var(--text-dim);
    padding: 12px;
    border-radius: 10px;
    text-align: left;
    cursor: pointer;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    transition: 0.2s;
}

.nav-link.active {
    background: var(--surface);
    color: var(--accent-color);
}

.content-panel {
    background: var(--surface);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 1.5rem;
}

.data-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.data-card {
    background: var(--bg-dark);
    border: 1px solid var(--border-color);
    padding: 1rem;
    border-radius: 12px;
}

.data-card.span-2 {
    grid-column: span 2;
}

.data-card label {
    display: block;
    font-size: 0.6rem;
    text-transform: uppercase;
    color: var(--text-dim);
    margin-bottom: 5px;
    font-weight: 700;
}

.data-card p {
    margin: 0;
    font-weight: 600;
    font-size: 0.95rem;
}

.highlight {
    color: var(--accent-color);
    font-size: 1.1rem !important;
}

/* MODALS */
.modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(8px);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.env-modal-surface {
    width: 480px;
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 20px;
    color: white;
    overflow: hidden;
}

.mini-modal {
    width: 380px !important;
}

.env-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem;
}

.env-header-left {
    display: flex;
    align-items: center;
    gap: 15px;
}

.env-icon-box {
    width: 40px;
    height: 40px;
    background: #27272a;
    border: 1px solid #3f3f46;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.env-icon-box.danger {
    color: #ef4444;
    border-color: rgba(239, 68, 68, 0.2);
    background: rgba(239, 68, 68, 0.1);
}

.env-header-text h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
}

.env-header-text p {
    margin: 0;
    font-size: 0.85rem;
    color: #a1a1aa;
}

.env-close-btn {
    background: transparent;
    border: none;
    color: #71717a;
    cursor: pointer;
    font-size: 1.2rem;
}

.env-modal-body {
    padding: 0 1.25rem 1.25rem;
    text-align: center;
}

.env-preview-zone {
    width: 100%;
    height: 180px;
    background: #09090b;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1rem;
    cursor: pointer;
    border: 1px solid #27272a;
    display: flex;
    align-items: center;
    justify-content: center;
}

.env-img-preview {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.env-empty-preview {
    color: #3f3f46;
    font-size: 2rem;
}

.env-choose-btn {
    width: 100%;
    background: #09090b;
    border: 1px solid #27272a;
    color: white;
    padding: 12px;
    border-radius: 10px;
    font-weight: 600;
    cursor: pointer;
}

.env-hint-text {
    font-size: 0.75rem;
    color: #71717a;
    margin-top: 12px;
}

.env-modal-footer {
    padding: 1.25rem;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.env-footer-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.env-btn-dark {
    background: #18181b;
    border: 1px solid #27272a;
    color: white;
    padding: 8px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.env-btn-danger-solid {
    background: #ef4444;
    color: white;
    border: none;
    padding: 8px;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
}

.env-btn-danger-solid:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

.env-btn-submit {
    width: 100%;
    background: #d4d4d8;
    color: #18181b;
    border: none;
    padding: 12px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
}

/* EDIT PROFILE MODAL */
.core-modal-surface {
    width: 550px;
    background: #0c0c0e;
    border: 1px solid #27272a;
    border-radius: 20px;
    overflow: hidden;
}

.core-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #27272a;
}

.core-modal-header h3 {
    margin: 0;
    font-size: 1rem;
    color: #818cf8;
    display: flex;
    align-items: center;
    gap: 10px;
}

.core-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    padding: 1.25rem;
}

.core-input label {
    display: block;
    font-size: 0.65rem;
    text-transform: uppercase;
    color: #71717a;
    margin-bottom: 4px;
    font-weight: 700;
}

.core-input input,
.core-input select {
    width: 100%;
    background: #18181b;
    border: 1px solid #27272a;
    color: white;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 0.85rem;
}

.core-modal-footer {
    padding: 1rem 1.25rem;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid #27272a;
}

.env-btn-primary {
    background: var(--accent-color);
    color: white;
    border: none;
    padding: 8px 20px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
}

/* SECURITY UI */
.security-box {
    max-width: 400px;
}

.security-footer {
    margin-top: 2rem;
}

.input-wrap {
    margin-bottom: 1.2rem;
}

.input-wrap label {
    display: block;
    font-size: 0.75rem;
    margin-bottom: 6px;
    color: var(--text-dim);
}

.password-field-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.password-field-wrapper input {
    width: 100%;
    background: var(--bg-dark);
    border: 1px solid var(--border-color);
    color: white;
    padding: 10px 45px 10px 12px;
    border-radius: 8px;
    font-size: 0.9rem;
}

.eye-toggle {
    position: absolute;
    right: 10px;
    background: transparent;
    border: none;
    color: var(--text-dim);
    cursor: pointer;
    font-size: 1.1rem;
    padding: 5px;
    display: flex;
}

.error-text {
    color: #ef4444;
    font-size: 0.7rem;
    margin-top: 4px;
    display: block;
    font-weight: 500;
}

.has-error input {
    border-color: #ef4444 !important;
}

.spinner-border {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    vertical-align: text-bottom;
    border: .15em solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spinner-border .75s linear infinite;
}

@keyframes spinner-border {
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .main-layout-grid {
        grid-template-columns: 1fr;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .core-grid {
        grid-template-columns: 1fr;
    }
}
</style>
<style>

.vue-toastification__container,
.Toastify__toast-container,
.toast-container,
.premium-toast-container {
    z-index: 2147483647 !important;
}
</style>