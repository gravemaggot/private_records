# frozen_string_literal: true

# Candidate Class
class Candidate
  include Mongoid::Document
  include Attachments

  def initialize(params = nil)
    super(params)
    self.guid ||= SecureRandom.uuid
    self.created_at = Time.new
    self.last_job_like_dislike ||= []
    self.work_experience_areas ||= []
    self.desired_pay_system ||= []
    self.active ||= true
    self.position_type ||= 'worker'
  end

  field :guid,                         type: String
  field :position,                     type: String
  field :position_type,                type: String
  field :vacancy_id,                   type: String
  field :vacancy,                      type: String
  field :first_name,                   type: String
  field :last_name,                    type: String
  field :sur_name,                     type: String
  field :date,                         type: Date
  field :city,                         type: String
  field :marital_status,               type: String
  field :conditions,                   type: String
  field :passport_serial,              type: String
  field :passport_number,              type: String
  field :citizenship,                  type: String
  field :private_number,               type: String
  field :passport_dep,                 type: String
  field :passport_date,                type: Date
  field :email,                        type: String
  field :phone,                        type: String
  field :created_at,                   type: DateTime
  field :military_registration,        type: String
  # relatives: {type:'',name:'',date:'',job:'',adr:''}
  field :relatives,                    type: Array
  field :registration_city,            type: String
  field :registration_street,          type: String
  field :registration_house,           type: String
  field :registration_apartment,       type: String
  field :residence_city,               type: String
  field :residence_street,             type: String
  field :residence_house,              type: String
  field :residence_apartment,          type: String
  field :drivers_license,              type: String
  field :having_a_car,                 type: String
  field :political_membership,         type: String
  field :conviction,                   type: String
  # education: {begin:'',end:'',inst:'',spec:'',form:''}
  field :education,                    type: Array
  # extra: {year:0,inst:'',name:'',duration:0}
  field :extra,                        type: Array
  # language: {name:'',orally:0,writing:0}
  field :language,                     type: Array
  field :word_level,                   type: String
  field :excel_level,                  type: String
  field :access_level,                 type: String
  field :_1c_level,                    type: String
  field :other_skills_level,           type: String
  field :extra_skills,                 type: String
  # experience: {name:'',pos:'',field:'',conds:'',dism:'',period:'',workers:0,subords:0,duties:''}
  field :experience,                   type: Array
  # reccomenders: {name:'',job:'',position:'',phone:''}
  field :reccomenders,                 type: Array
  # last_job_like_dislike: %w[ls upct llbo drwm ncp emr ow so]
  field :last_job_like_dislike,        type: Array
  # work_experience_areas: %w[so prod serv whsal ret publ pc build tr ent]
  field :work_experience_areas,        type: Array
  field :work_experience_areas_other,  type: String
  field :hobbies,                      type: String
  field :personality_strengths,        type: String
  field :acceptable_working_schedule,  type: String
  field :job_choice_reason,            type: String
  field :work_debufs,                  type: String
  field :trial_period_salaries,        type: Integer
  field :post_trial_salaries,          type: Integer
  # desired_pay_system: %w[sal salbon int salint]
  field :desired_pay_system,           type: Array
  field :additional_income,            type: String
  field :overtime_work,                type: Integer
  field :business_trips,               type: Integer
  field :training,                     type: Integer
  field :ready_to_start_work,          type: Date
  field :about_yourself,               type: String
  field :author_email,                 type: String
  field :active,                       type: Boolean

  mount_uploader :image, ImageUploader, type: String

  validates :guid,
            :position,
            :first_name,
            :last_name,
            # :sur_name,
            # :date,
            :phone,
            :email,
            presence: true

  index({ guid: 1 }, { unique: true, name: 'guid_index' })

  scope :id,   ->(id)   { where(id: id) }
  scope :guid, ->(guid) { where(guid: guid) }

  belongs_to :vacancy
end
